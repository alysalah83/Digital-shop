import { getCategoriesWithProductsCount } from "@/features/category/queries/categories.queries";
import { getProductsMinMaxPrice } from "@/features/product/queries/products.queries";

import { SortOrder } from "@/features/product/types/product.type";

type ShopSearchParams = {
  category?: string;
  page?: string;
  sortBy?: SortOrder;
  min?: string;
  max?: string;
  layoutShape?: string;
};

// type SelectFilterValue = (typeof )[number]["value"];

type CategoryWithProductsCount = Awaited<
  ReturnType<typeof getCategoriesWithProductsCount>
>[number];

type ProductsMinMaxPrice = Awaited<ReturnType<typeof getProductsMinMaxPrice>>;

export type {
  CategoryWithProductsCount,
  ProductsMinMaxPrice,
  ShopSearchParams,
};
