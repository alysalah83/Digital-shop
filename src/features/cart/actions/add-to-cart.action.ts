"use server";

import { createGuest } from "@/features/auth/actions/create-guest.action";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse } from "@/shared/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addToCart(productId: number): Promise<ActionResponse> {
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
      await prisma.cartItem.create({
        data: {
          productId,
          quantity,
          ...(userId && { userId }),
          ...(guestId && { guestId }),
        },
      });
      updateTag(`cart-${userId || guestId}`);

      return {
        status: "success",
        message: "Product has been added to your cart",
      };
    }

    await prisma.cartItem.update({
      where: {
        id: cartItem?.id,
      },
      data: { quantity: cartItem.quantity + quantity },
    });

    updateTag(`cart-${userId || guestId}`);
    return {
      status: "success",
      message: `Cart quantity updated to ${cartItem.quantity + quantity}`,
    };
  } catch (error) {
    return { status: "error", error: { message: "" } };
  }
}
