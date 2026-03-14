import RatingStars from "@/shared/components/ui/RatingStars";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product.type";
import ProductFeaturesBar from "./ProductFeaturesBar";
import { Suspense } from "react";
import ProductFeaturesBarSkeleton from "./ProductFeaturesBarSkeleton";

function ProductRow({ product }: { product: Product }) {
  const { id, image, name, price, rating, discountPercentage } = product;

  return (
    <div className="group flex w-full flex-col rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg sm:flex-row">
      <div className="relative overflow-hidden border-b border-gray-300 p-3 sm:border-r sm:border-b-0 sm:p-4">
        <div className="mx-auto h-40 w-40 flex-shrink-0 cursor-pointer rounded-lg sm:h-52 sm:w-52 md:h-56 md:w-56 lg:h-64 lg:w-64">
          <Link href={`/shop/${id}`}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`${name} image`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 192px, (max-width: 768px) 208px, (max-width: 1024px) 224px, 256px"
              />
            </div>
          </Link>
          <Suspense fallback={<ProductFeaturesBarSkeleton />}>
            <ProductFeaturesBar product={product} />
          </Suspense>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="mb-2 text-base font-bold tracking-wide transition-colors duration-300 group-hover:text-blue-700 hover:cursor-pointer hover:text-blue-700 sm:text-lg">
            <Link href={`/shop/${id}`}>{name}</Link>
          </h3>

          <div className="mb-2">
            <RatingStars currentRating={rating} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-lg font-bold text-gray-600 tabular-nums">
            ${price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${Math.round(price + price * (discountPercentage / 100))}
          </span>
          <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            {Math.round(discountPercentage)}% OFF
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductRow;
