import prisma from "@/lib/prisma";
import { Product } from "../types/product.type";

export async function getProduct(productId: Product["id"]) {
  return await prisma.product.findUnique({ where: { id: productId } });
}

export async function getProductWithReviews(productId: Product["id"]) {
  return await prisma.product.findUnique({
    where: { id: productId },
    include: { reviews: true },
  });
}
