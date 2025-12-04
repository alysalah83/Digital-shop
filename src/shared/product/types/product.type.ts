import { Prisma } from "@prisma/client";

type ProductSummary = Prisma.ProductGetPayload<{
  select: {
    id: true;
    price: true;
    brand: true;
    image: true;
    name: true;
    rating: true;
    discountPercentage: true;
  };
}>;

type ProductSummaryWithDescription = Prisma.ProductGetPayload<{
  select: {
    id: true;
    price: true;
    brand: true;
    image: true;
    name: true;
    rating: true;
    discountPercentage: true;
    description: true;
  };
}>;

type ProductWithDiscount = Prisma.ProductGetPayload<{
  select: {
    name: true;
    price: true;
    discountPercentage: true;
    image: true;
    id: true;
    description: true;
  };
}>;

type Product = Prisma.ProductGetPayload<object>;

type ProductWithReviews = Prisma.ProductGetPayload<{
  include: { reviews: true };
}>;

type ProductDetails = Prisma.ProductGetPayload<{
  select: { id: true; description: true };
  include: { reviews: true };
}>;

type ProductWithDescriptionItem = Prisma.ProductGetPayload<{
  select: {
    image: true;
    name: true;
    description: true;
    price: true;
    rating: true;
  };
}>;

export type {
  ProductSummary,
  Product,
  ProductWithDiscount,
  ProductWithReviews,
  ProductDetails,
  ProductWithDescriptionItem,
  ProductSummaryWithDescription,
};
