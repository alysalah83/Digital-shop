"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addToCart(productId: number) {
  const quantity = 1;
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const cookieStore = await cookies();
    let guestId = cookieStore.get("guestId")?.value;

    if (userId) {
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          userId,
          productId,
        },
      });

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
          include: { product: true },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            userId,
            productId,
            quantity,
          },
          include: { product: true },
        });
      }
    } else {
      if (!guestId) {
        guestId = crypto.randomUUID();
        cookieStore.set("guestId", guestId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
      }

      const existingItem = await prisma.cartItem.findFirst({
        where: {
          guestId,
          productId,
        },
      });

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity },
          include: { product: true },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            guestId,
            productId,
            quantity,
          },
          include: { product: true },
        });
      }
    }

    console.log(guestId);

    updateTag(`cartItem-${productId}-${userId || guestId}`);
    updateTag(`cart-${userId || guestId}`);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function deleteFromCart(productId: number) {
  try {
    const session = await auth();

    const userId = session?.user?.id;
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (userId) {
      await prisma.cartItem.deleteMany({
        where: {
          productId,
          userId,
        },
      });
    } else {
      if (guestId) {
        await prisma.cartItem.deleteMany({
          where: {
            productId,
            guestId,
          },
        });
      } else return;
    }
    updateTag(`cartItem-${productId}-${userId || guestId}`);
    updateTag(`cart-${userId || guestId}`);
  } catch (err) {
    console.error(err);
  }
}
