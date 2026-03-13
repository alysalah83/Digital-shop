import { Prisma } from "@/generated/prisma/client";

type Product = Prisma.ProductGetPayload<object>;

type ProductWithReviews = Prisma.ProductGetPayload<{
  include: { reviews: true };
}>;

type SortOrder = "asc" | "desc";

type ProductsLayoutShape = "verticalCard" | "horizontalCard";

export type { Product, ProductWithReviews, SortOrder, ProductsLayoutShape };
