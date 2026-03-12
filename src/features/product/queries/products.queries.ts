import prisma from "@/lib/prisma";
import { Prisma } from "../../../../lib/generated/prisma/client";
import { ShopSearchParams } from "@/app/shop/(shop)/_components/shop.types";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/shop/(shop)/_components/shop.consts";

export async function getProducts({
  orderBy,
  take,
}: {
  orderBy?: Prisma.ProductOrderByWithRelationInput;
  take?: number;
}) {
  const products = await prisma.product.findMany({
    ...(orderBy && { orderBy }),
    ...(take && { take }),
  });
  return products;
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

export async function getProductsCount({
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
