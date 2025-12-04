import Image from "next/image";
import { ProductWithDescriptionItem } from "../types/product.type";
import RatingStars from "@/components/ui/RatingStars";

function ProductWithDescription({
  productSummery,
}: {
  productSummery: ProductWithDescriptionItem;
}) {
  const { image, name, description, price, rating } = productSummery;

  return (
    <div className="flex min-w-80 flex-col gap-8 rounded-xl bg-gray-200 p-10 sm:min-w-xl sm:flex-row">
      <div className="relative aspect-square w-full max-w-md">
        <Image
          src={image}
          fill
          alt={`${name} image`}
          sizes="500px"
          className="z-50 object-contain"
        />
        <div className="absolute top-1/2 left-1/2 z-40 aspect-square w-full -translate-1/2 rounded-full bg-gray-500/10" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 border-b border-gray-400 pb-4">
          <h3 className="text-xl font-bold tracking-wide text-gray-700 sm:text-2xl">
            {name}
          </h3>
          <div className="flex flex-col gap-2">
            <RatingStars currentRating={rating} />
            <span className="text-xl font-semibold text-blue-900">
              Price: <span className="font-bold tabular-nums">${price}</span>
            </span>
          </div>
        </div>
        <p className="text-base font-medium text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default ProductWithDescription;
