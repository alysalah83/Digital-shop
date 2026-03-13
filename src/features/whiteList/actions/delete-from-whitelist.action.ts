"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse } from "@/shared/types";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deleteFromWhiteList(
  productId: number,
): Promise<ActionResponse> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const guestId = (await cookies()).get("guestId")?.value;
    if (!userId && !guestId)
      return {
        status: "error",
        error: { message: "you have no accsess to remove this item" },
      };

    await prisma.whiteListItem.deleteMany({
      where: {
        productId,
        ...(userId && { userId }),
        ...(guestId && { guestId }),
      },
    });
    updateTag(`whitelist-${userId || guestId}`);
    return {
      status: "success",
      message: "product has been removed from whitelist",
    };
  } catch (err) {
    return { status: "error", error: { message: "" } };
  }
}
