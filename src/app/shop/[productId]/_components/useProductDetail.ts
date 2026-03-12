import { Review } from "./review/index";
import { Product } from "../../../../features/product/types/product.type";

export function useProductDetail({
  discountPercentage,
  reviews,
  price,
}: {
  discountPercentage: Product["discountPercentage"];
  reviews: Review[];
  price: Product["price"];
}) {
  const roundedDiscount = Math.round(discountPercentage);
  const reviewsCount = reviews.length;
  const priceBeforeDiscount = Math.round(price + price / discountPercentage);
  const haveFreeShipping = price > 250;

  return {
    roundedDiscount,
    reviewsCount,
    priceBeforeDiscount,
    haveFreeShipping,
  };
}
