import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { ProductSummary } from "../types/product.type";
import RatingStars from "@/shared/components/ui/RatingStars";
import ButtonIcon from "@/shared/components/common/ButtonIcon";
import AccountDeleteProductBtn from "@/features/account/components/AccountDeleteProductBtn";

function ProductWithActionsCard({
  productItem,
}: {
  productItem: ProductSummary;
}) {
  const { id, image, name, price, rating, brand } = productItem;

  return (
    <div className="flex items-center overflow-auto">
      <Link href={`/shop/${id}`} className="w-full pr-2">
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
              {name}
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
      <div className="flex h-full w-fit flex-shrink-0 flex-col gap-3 p-4">
        <AccountDeleteProductBtn productId={id} />
        <ButtonEdit />
      </div>
    </div>
  );
}

function ButtonEdit() {
  return (
    <button
      className="group h-fit cursor-pointer self-center rounded-md border border-gray-300 p-2 text-gray-400 transition duration-300 hover:border-blue-600 hover:bg-blue-600/20"
      aria-label="Edit product"
    >
      <FaRegEdit className="h-5 w-5 transition duration-300 group-hover:text-blue-600/70" />
    </button>
  );
}

export default ProductWithActionsCard;
