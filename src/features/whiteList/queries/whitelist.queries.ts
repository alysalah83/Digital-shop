import { User } from "@/generated/prisma/client";
import { catchError } from "@/lib/error/catchError";
import prisma from "@/lib/prisma";

export const getWhitelistProducts = catchError(async function ({
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
});
