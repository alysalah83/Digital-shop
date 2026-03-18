import { User } from "@/generated/prisma/client";
import { catchError } from "@/lib/error/catchError";
import prisma from "@/lib/prisma";

export const getCartItemsProducts = catchError(
  async function getCartItemsProducts({
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
  },
);

export const getIsProductInCart = catchError(async function getIsProductInCart({
  productId,
  userId,
  guestId,
}: {
  productId: number;
  userId: string | undefined;
  guestId: string | undefined;
}) {
  if (!userId && !guestId) return false;

  const count = await prisma.cartItem.count({
    where: {
      productId,
      ...(userId && { userId }),
      ...(guestId && { guestId }),
    },
  });
  return count > 0;
});
