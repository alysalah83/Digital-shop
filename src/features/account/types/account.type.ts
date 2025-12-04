import { Prisma } from "@prisma/client";

type UserData = Prisma.UserGetPayload<{
  select: { name: true; email: true; address: true };
}>;

interface CreateProductInputs {
  name: string;
  price: number;
  brand: string;
  stock: number;
  description: string;
  category: number;
}

export type { UserData, CreateProductInputs };
