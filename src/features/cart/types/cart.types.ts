// import { Prisma } from "@prisma/client";

import { Prisma } from "@/generated/prisma/client";

type CartProductItem = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type { CartProductItem };
