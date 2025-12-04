import { Prisma } from "@prisma/client";

type CartItem = Prisma.CartItemGetPayload<{ include: { product: true } }>;

type CartItemSummery = Prisma.CartItemGetPayload<{
  include: {
    product: {
      select: {
        id: true;
        image: true;
        name: true;
        price: true;
      };
    };
  };
}>;

export type { CartItem, CartItemSummery };
