"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function toggleWhiteList(productId: number) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const cookieStore = await cookies();
    let guestId = cookieStore.get("guestId")?.value;

    if (userId) {
      const existingItem = await prisma.whiteListItem.findFirst({
        where: {
          userId,
          productId,
        },
      });

      if (existingItem) {
        await prisma.whiteListItem.deleteMany({
          where: {
            productId,
            userId,
          },
        });
      } else {
        await prisma.whiteListItem.create({
          data: {
            userId,
            productId,
          },
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

      const existingItem = await prisma.whiteListItem.findFirst({
        where: {
          guestId,
          productId,
        },
      });

      if (existingItem) {
        await prisma.whiteListItem.deleteMany({
          where: {
            productId,
            guestId,
          },
        });
      } else {
        await prisma.whiteListItem.create({
          data: {
            guestId,
            productId,
          },
        });
      }
    }
    updateTag(`whiteListItem-${productId}-${userId || guestId}`);
    updateTag(`whiteList-${userId || guestId}`);
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function deleteFromWhiteList(productId: number) {
  try {
    const session = await auth();

    const userId = session?.user?.id;
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (userId) {
      await prisma.whiteListItem.deleteMany({
        where: {
          productId,
          userId,
        },
      });
    } else {
      if (guestId) {
        await prisma.whiteListItem.deleteMany({
          where: {
            productId,
            guestId,
          },
        });
      }
    }
    updateTag(`whiteListItem-${productId}-${userId || guestId}`);
  } catch (err) {
    console.error(err);
  }
}
