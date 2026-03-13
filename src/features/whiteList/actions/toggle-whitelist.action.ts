"use server";

import { createGuest } from "@/features/auth/actions/create-guest.action";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse } from "@/shared/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function toggleWhiteList(
  productId: number,
): Promise<ActionResponse> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    let guestId = (await cookies()).get("guestId")?.value;
    if (!userId && !guestId) guestId = await createGuest();

    const ownField = userId ? { userId } : { guestId };

    const whitelistItem = await prisma.whiteListItem.findFirst({
      where: {
        productId,
        ...ownField,
      },
    });

    if (whitelistItem)
      await prisma.whiteListItem.deleteMany({
        where: {
          productId,
          ...ownField,
        },
      });
    else if (!whitelistItem)
      await prisma.whiteListItem.create({
        data: {
          productId,
          ...ownField,
        },
      });

    updateTag(`whitelist-${userId || guestId}`);
    return {
      status: "success",
      message: `Whitelist product has been ${whitelistItem ? "removed" : "added"}`,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
