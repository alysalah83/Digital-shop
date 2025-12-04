const PAGINATION_ITEMS_PER_PAGE = 9;
const PRODUCTS_LAYOUT = [
  { shape: "verticalCard", icon: "layoutGrid" },
  { shape: "horizontalCard", icon: "row" },
] as const;

const INITIAL_LAYOUT_SHAPE = "verticalCard";

const SEARCH_CACHE_TIME = 60 * 60 * 1000;

export {
  PAGINATION_ITEMS_PER_PAGE,
  PRODUCTS_LAYOUT,
  INITIAL_LAYOUT_SHAPE,
  SEARCH_CACHE_TIME,
};
