import { SortOrder } from "@/features/product/types/product.type";

type LayoutShape = "verticalCard" | "horizontalCard";

type ShopSearchParams = {
  category?: string;
  page?: string;
  sortBy?: SortOrder;
  min?: string;
  max?: string;
  layoutShape?: string;
};

export type { LayoutShape, ShopSearchParams };
