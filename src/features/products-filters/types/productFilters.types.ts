import { Prisma } from "@prisma/client";
import { SELECT_FILTER_OPTIONS } from "../consts/productsFilters.consts";

type CategoryWithProductsCount = {
  id: number;
  name: string;
  _count: {
    products: number;
  };
};

type PriceMinMax = Prisma.GetProductAggregateType<{
  _min: {
    price: true;
  };
  _max: {
    price: true;
  };
}>;

type SelectFilterValue = (typeof SELECT_FILTER_OPTIONS)[number]["value"];

export type { CategoryWithProductsCount, PriceMinMax, SelectFilterValue };
