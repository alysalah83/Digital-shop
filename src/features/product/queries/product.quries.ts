import prisma from "@/lib/prisma";
import { Product } from "../types/product.type";
import { catchError } from "@/lib/error/catchError";

export const getProduct = catchError(async function getProduct(
  productId: Product["id"],
) {
  return await prisma.product.findUnique({ where: { id: productId } });
});

export const getProductWithReviews = catchError(
  async function getProductWithReviews(productId: Product["id"]) {
    return await prisma.product.findUnique({
      where: { id: productId },
      include: { reviews: true },
    });
  },
);
