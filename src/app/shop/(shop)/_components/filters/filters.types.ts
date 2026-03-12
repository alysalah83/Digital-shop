// import { Prisma } from "@prisma/client";

import { getCategoriesWithProductsCount } from "@/features/category/queries/categories.queries";
import { getProductsMinMaxPrice } from "@/features/product/queries/products.queries";

// type SelectFilterValue = (typeof SELECT_FILTER_OPTIONS)[number]["value"];

// export type { CategoryWithProductsCount, PriceMinMax, SelectFilterValue };

type CategoryWithProductsCount = Awaited<
  ReturnType<typeof getCategoriesWithProductsCount>
>[number];
type ProductsMinMaxPrice = Awaited<ReturnType<typeof getProductsMinMaxPrice>>;

export type { CategoryWithProductsCount, ProductsMinMaxPrice };
