import { catchError } from "@/lib/error/catchError";
import prisma from "@/lib/prisma";

export const getCategories = catchError(async function getCategories() {
  return await prisma.category.findMany();
});

export const getCategoriesWithProductsCount = catchError(
  async function getCategoriesWithProductsCount() {
    const result = await prisma.category.findMany({
      select: { id: true, name: true, _count: { select: { products: true } } },
    });

    return result.map(({ _count, ...category }) => ({
      ...category,
      productsCount: _count.products,
    }));
  },
);
