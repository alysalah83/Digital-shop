import { ProductsLayoutShape } from "@/features/product/types/product.type";

const PAGINATION_ITEMS_PER_PAGE = 9;

const SHOP_DEFAULT_LAYOUT_SHAPE = "horizontalCard" as ProductsLayoutShape;

const SEARCH_CACHE_TIME = 60 * 60 * 1000;

export {
  PAGINATION_ITEMS_PER_PAGE,
  SHOP_DEFAULT_LAYOUT_SHAPE,
  SEARCH_CACHE_TIME,
};
