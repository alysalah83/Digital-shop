import { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function getCartItemsProducts({
  userId,
  guestId,
}: {
  userId?: User["id"];
  guestId?: string;
}) {
  if (!userId && !guestId) return [];
  return await prisma.cartItem.findMany({
    where: {
      ...(userId && { userId }),
      ...(guestId && { guestId }),
    },
    include: { product: true },
  });
}

export async function getIsProductInCart({
  productId,
  userId,
  guestId,
}: {
  productId: number;
  userId: string | undefined;
  guestId: string | undefined;
}) {
  if (!userId && !guestId) return false;

  return await prisma.cartItem
    .count({
      where: {
        productId,
        ...(userId && { userId }),
        ...(guestId && { guestId }),
      },
    })
    .then((count) => count > 0);
}
