import prisma from "@/lib/prisma";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/shop/(shop)/_components/shop.consts";
import { Prisma } from "@/generated/prisma/client";
import { ShopSearchParams } from "@/app/shop/(shop)/_components/filters/filters.types";

export async function getProducts({
  where,
  orderBy,
  take,
  skip,
}: {
  where?: Prisma.ProductWhereInput;
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  take?: number;
  skip?: number;
}) {
  const products = await prisma.product.findMany({
    ...(where && { where }),
    ...(orderBy && { orderBy }),
    ...(take && { take }),
    ...(skip && { skip }),
  });
  return products;
}

export async function getProductsCount() {
  return await prisma.product.count();
}

export async function getProductsWithReviews({
  orderBy,
  take,
}: {
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  take?: number;
}) {
  const products = await prisma.product.findMany({
    ...(orderBy && { orderBy }),
    ...(take && { take }),
    include: { reviews: true },
  });
  return products;
}

export async function getFilteredProducts({
  category,
  page,
  sortBy,
  min,
  max,
}: ShopSearchParams) {
  const pageNum = Number(page) || 1;

  const price = {
    gte: Number(min) || undefined,
    lte: Number(max) || undefined,
  };

  const getOrderBy = () => {
    if (!sortBy) return undefined;
    const [filterFor, filterDir] = sortBy.split("_");
    return {
      [filterFor]: filterDir,
    };
  };

  const categoryFilterArr = category?.split(",").filter(Boolean);
  const where = category
    ? {
        category: {
          name: { in: categoryFilterArr },
        },
        price,
      }
    : { price };

  const products = await prisma.product.findMany({
    where,
    orderBy: getOrderBy(),
    skip: (pageNum - 1) * PAGINATION_ITEMS_PER_PAGE,
    take: PAGINATION_ITEMS_PER_PAGE,
  });

  return products;
}

export async function getFilteredProductsCount({
  category,
  min,
  max,
}: Omit<ShopSearchParams, "page" | "sortBy">) {
  const price = {
    gte: Number(min) || undefined,
    lte: Number(max) || undefined,
  };
  const categoryFilterArr = category?.split(",").filter(Boolean);
  const where = category
    ? {
        category: {
          name: { in: categoryFilterArr },
        },
        price,
      }
    : { price };

  return await prisma.product.count({ where });
}

export async function getProductsMinMaxPrice() {
  const result = await prisma.product.aggregate({
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  return { minPrice: result._min.price, maxPrice: result._max.price };
}
