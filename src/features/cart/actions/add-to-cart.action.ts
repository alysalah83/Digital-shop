"use server";

import { createGuest } from "@/features/auth/actions/create-guest.action";
import { auth } from "@/lib/auth";
import { toAppError } from "@/lib/error/convertErrorToAppError";
import prisma from "@/lib/prisma";
import { ActionResponse } from "@/shared/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { CartProductItem } from "../types/cart.types";

export async function addToCart(
  productId: number,
): Promise<ActionResponse<{ cartProduct: CartProductItem }>> {
  const quantity = 1;
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const cookieStore = await cookies();
    let guestId = cookieStore.get("guestId")?.value;
    if (!userId && !guestId) guestId = await createGuest();

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        productId,
        ...(userId && { userId }),
        ...(guestId && { guestId }),
      },
    });

    if (!cartItem) {
      const cartProduct = await prisma.cartItem.create({
        data: {
          productId,
          quantity,
          ...(userId && { userId }),
          ...(guestId && { guestId }),
        },
        include: {
          product: true,
        },
      });
      updateTag(`cart-${userId || guestId}`);

      return {
        status: "success",
        message: "Product has been added to your cart",
        payload: { cartProduct },
      };
    }

    const updatedCartProduct = await prisma.cartItem.update({
      where: {
        id: cartItem?.id,
      },
      include: { product: true },
      data: { quantity: cartItem.quantity + quantity },
    });

    updateTag(`cart-${userId || guestId}`);
    return {
      status: "success",
      message: `Cart quantity updated to ${cartItem.quantity + quantity}`,
      payload: { cartProduct: updatedCartProduct },
    };
  } catch (error) {
    return { status: "error", error: toAppError(error) };
  }
}
