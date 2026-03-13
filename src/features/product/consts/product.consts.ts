const PRODUCTS_SORTBY_OPTIONS = [
  {
    value: "price_desc",
    label: "Price (High to Low)",
  },
  {
    value: "price_asc",
    label: "Price (Low to High)",
  },
  {
    value: "createdAt_desc",
    label: "Release Date (Latest to Oldest)",
  },
  {
    value: "createdAt_asc",
    label: "Release Date (Oldest to Latest)",
  },
] as const;

const PRODUCTS_LAYOUT_SHAPES = [
  { shape: "verticalCard", icon: "layoutGrid" },
  { shape: "horizontalCard", icon: "row" },
] as const;

const PRODUCTS_LAYOUT_SHAPE_PARAM_KEY = "layoutShape";

export {
  PRODUCTS_SORTBY_OPTIONS,
  PRODUCTS_LAYOUT_SHAPES,
  PRODUCTS_LAYOUT_SHAPE_PARAM_KEY,
};
