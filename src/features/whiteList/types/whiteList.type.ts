import { Prisma } from "@/generated/prisma/client";

type WhiteListProductItem = Prisma.WhiteListItemGetPayload<{
  include: { product: true };
}>;

export type { WhiteListProductItem };
