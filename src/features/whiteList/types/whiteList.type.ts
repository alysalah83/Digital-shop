import { Prisma } from "@prisma/client";

type WhiteListItem = Prisma.WhiteListItemGetPayload<{
  include: { product: true };
}>;

export type { WhiteListItem };
