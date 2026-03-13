import prisma from "@/lib/prisma";

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function getCategoriesWithProductsCount() {
  const result = await prisma.category.findMany({
    select: { id: true, name: true, _count: { select: { products: true } } },
  });

  return result.map(({ _count, ...category }) => ({
    ...category,
    productsCount: _count.products,
  }));
}
