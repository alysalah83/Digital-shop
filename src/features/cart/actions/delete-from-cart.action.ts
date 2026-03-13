"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse } from "@/shared/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteFromCart(
  productId: number,
): Promise<ActionResponse> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;
    if (!userId && !guestId)
      return {
        status: "error",
        error: { message: "not allowed to delete this item" },
      };

    await prisma.cartItem.deleteMany({
      where: {
        productId,
        ...(userId && { userId }),
        ...(guestId && { guestId }),
      },
    });

    updateTag(`cart-${userId || guestId}`);
    return { status: "success", message: "Cart items has been deleted" };
  } catch (err) {
    return {
      status: "error",
      error: { message: "" },
    };
  }
}
