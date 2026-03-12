import { Prisma } from "@prisma/client";

type Product = Prisma.ProductGetPayload<object>;

type ProductWithReviews = Prisma.ProductGetPayload<{
  include: { reviews: true };
}>;

type SortOrder = "asc" | "desc";

export type { Product, ProductWithReviews, SortOrder };
