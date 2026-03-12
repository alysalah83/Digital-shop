import Image from "next/image";
import Link from "next/link";
import RatingStars from "@/shared/components/ui/RatingStars";
import { Suspense } from "react";
import { Product } from "../types/product.type";
import ProductFeaturesBar from "./ProductFeaturesBar";
import ProductFeaturesBarSkeleton from "./ProductFeaturesBarSkeleton";

function ProductCard({
  product,
  variant = "default",
}: {
  product: Product;
  variant?: "default" | "reverse";
}) {
  const { image, name, price, rating, discountPercentage, id } = product;

  const originalPrice = Math.round(price + price * (discountPercentage / 100));

  if (variant === "default")
    return (
      <div className="group rounded-lg bg-gray-100 p-5 lg:p-6">
        <RatingStars currentRating={rating} />
        <h3 className="mb-2 text-lg font-semibold tracking-wide transition-colors duration-300 peer-hover:text-blue-700 hover:cursor-pointer hover:text-blue-700">
          <Link href={`/shop/${id}`}>{name}</Link>
        </h3>
        <span className="flex gap-3 text-lg font-bold">
          <span>${price}</span>
          <span className="text-gray-300 line-through">${originalPrice}</span>
        </span>
        <div className="peer relative mb-6 h-64 w-full overflow-hidden hover:cursor-pointer">
          <Link href={`/shop/${id}`}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`${name} image`}
                fill
                className="object-contain p-2"
                sizes="260px"
              />
            </div>
          </Link>
          <Suspense fallback={<ProductFeaturesBarSkeleton />}>
            <ProductFeaturesBar product={product} />
          </Suspense>
        </div>
      </div>
    );
  else if (variant === "reverse")
    return (
      <div className="group">
        <div className="peer relative mb-6 h-64 w-full overflow-hidden rounded-lg bg-gray-100 hover:cursor-pointer">
          <Link href={`/shop/${id}`}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`${name} image`}
                fill
                className="object-contain p-2"
                sizes="260px"
              />
            </div>
          </Link>
          <Suspense fallback={<ProductFeaturesBarSkeleton />}>
            <ProductFeaturesBar product={product} />
          </Suspense>
        </div>
        <RatingStars currentRating={rating} />
        <h3 className="mb-3 text-lg font-semibold tracking-wide capitalize transition-colors duration-300 peer-hover:text-blue-700 hover:cursor-pointer hover:text-blue-700">
          <Link href={`/shop/${id}`}>{name}</Link>
        </h3>
        <span className="flex gap-3 text-lg font-bold">
          <span>${price}</span>
          <span className="font-normal tracking-wide text-gray-400 line-through">
            ${originalPrice}
          </span>
        </span>
      </div>
    );
}

export default ProductCard;
