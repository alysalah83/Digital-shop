import Link from "next/link";
import { Product } from "../types/product.type";
import Image from "next/image";
import HighlightedText from "@/shared/components/ui/HighLightedText";
import RatingStars from "@/shared/components/ui/RatingStars";

interface ProductSearchCardProps {
  product: Product;
  searchQuery: string;
}

function ProductSearchItem({ product, searchQuery }: ProductSearchCardProps) {
  const { id, image, name, price, brand, rating } = product;
  return (
    <li className="flex items-center overflow-auto">
      <Link href={`/shop/${id}`} className="w-full">
        <div className="flex min-w-0 items-center gap-4 rounded-xl py-4 transition duration-300 hover:bg-gray-200 md:px-4">
          <div className="h-26 min-h-26 w-26 min-w-26 flex-shrink-0 rounded-xl bg-gray-100 lg:h-32 lg:w-32 xl:h-40 xl:w-40">
            <div className="relative h-full w-full">
              <Image
                fill
                src={image}
                alt={`${name} image`}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2 py-6 sm:px-6">
            <h4 className="cursor-pointer text-lg font-semibold transition duration-300 hover:text-blue-600 lg:text-2xl">
              <HighlightedText text={name} highlightedQuery={searchQuery} />
            </h4>
            <div className="flex flex-wrap items-center gap-1 lg:gap-3">
              <span className="text-lg font-medium text-gray-500 lg:text-xl">
                ${price}
              </span>
              <span className="text-lg font-medium text-gray-300">|</span>
              <h5 className="text-lg font-medium text-gray-500 lg:text-xl">
                {brand}
              </h5>
              <span className="text-lg font-medium text-gray-300">|</span>
              <div className="flex-shrink-0">
                <RatingStars starSize={20} currentRating={rating} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductSearchItem;
