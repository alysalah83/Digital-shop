import Image from "next/image";
import Link from "next/link";
import HighlightedText from "@/components/ui/HighLightedText";
import { ProductSummaryWithDescription } from "../types/product.type";
import RatingStars from "@/components/ui/RatingStars";
import ProductFeaturesBar from "./ProductFeaturesBar";

interface HorizontalProductCardProps {
  productItem: ProductSummaryWithDescription;
  searchQuery?: string;
  withCurdBtns?: boolean;
  type?: "primary" | "secondary";
}

function HorizontalProductCard({
  productItem,
  searchQuery,
  withCurdBtns = false,
  type = "primary",
}: HorizontalProductCardProps) {
  const {
    id,
    image,
    name,
    price,
    brand,
    rating,
    description,
    discountPercentage,
  } = productItem;

  if (type === "primary")
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
            <ProductFeaturesBar
              productId={id}
              productSummery={{ description, image, name, price, rating }}
            />
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
  else
    return (
      <div className="flex items-center overflow-auto">
        <Link
          href={`/shop/${id}`}
          className={`w-full ${withCurdBtns ? "pr-2" : ""}`}
        >
          <li className="flex min-w-0 items-center gap-4 rounded-xl py-4 transition duration-300 hover:bg-gray-200 md:px-4">
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
                {searchQuery ? (
                  <HighlightedText text={name} highlightedQuery={searchQuery} />
                ) : (
                  name
                )}
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
          </li>
        </Link>
        {withCurdBtns && (
          <div className="flex h-full w-fit flex-shrink-0 flex-col gap-3 p-4">
            {/* <ButtonDelete onRemove={deleteProduct.bind(null, id)} />
          <ButtonEdit /> */}
          </div>
        )}
      </div>
    );
}

export default HorizontalProductCard;
