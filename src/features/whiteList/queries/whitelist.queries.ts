import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getWhitelistProducts({
  userId,
  guestId,
}: {
  userId: User["id"] | undefined;
  guestId: string | undefined;
}) {
  if (!userId && !guestId) return [];

  return await prisma.whiteListItem.findMany({
    where: { ...(userId && { userId }), ...(guestId && { guestId }) },
    include: { product: true },
  });
}
