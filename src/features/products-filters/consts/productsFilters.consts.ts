const PRICE_RANGER_STEP_SIZE = 50;

const SELECT_FILTER_OPTIONS = [
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

export { PRICE_RANGER_STEP_SIZE, SELECT_FILTER_OPTIONS };
