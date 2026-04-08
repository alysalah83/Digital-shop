import Image from "next/image";
import { ProductWithReviews } from "../../../../features/product/types/product.type";
import RatingStars from "@/shared/components/ui/RatingStars";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import ProductStockCount from "../../../../features/product/components/ProductStockCount";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/shared/components/ui/Modal";
import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useProductDetail } from "./useProductDetail";
import PurchaseProductBtn from "./PurchaseProductBtn";

function ProductHero({ product }: { product: ProductWithReviews }) {
  const { image, name, discountPercentage, reviews, stock, rating, price } =
    product;
  const {
    haveFreeShipping,
    priceBeforeDiscount,
    reviewsCount,
    roundedDiscount,
  } = useProductDetail({ discountPercentage, price, reviews });

  return (
    <div className="gap mt-6 flex flex-col gap-10 lg:flex-row">
      <div className="relative flex h-90 w-full justify-center rounded-xl bg-gray-100 py-10 lg:h-[500px]">
        <div className="relative h-full w-80">
          <Image
            src={image}
            fill
            alt={`${name} image`}
            sizes="500px"
            className="object-contain"
          />
        </div>
        <Modal>
          <ModalTrigger>
            <div className="absolute top-4 right-4">
              <ButtonIcon
                icon="fullScreen"
                ariaLabel={`${name} full screen image`}
              />
            </div>
          </ModalTrigger>
          <ModalContent closeBtnColor="text-blue-50">
            <div className="relative aspect-square h-[50vh] max-w-[100vw] sm:h-[75vh]">
              <Image
                src={image}
                fill
                sizes="75vh"
                quality={100}
                alt={`${name} image`}
              />
            </div>
          </ModalContent>
        </Modal>
      </div>
      <div className="sm:p-4 lg:min-w-1/2 lg:py-8">
        <div className="mb-8 border-b border-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold sm:text-2xl lg:text-2xl xl:text-3xl">
              {name}
            </h3>
            <span className="rounded-sm bg-blue-600 px-2 py-1 text-sm font-bold tracking-wide text-blue-50">
              {roundedDiscount}% Off
            </span>
          </div>
          <div className="mb-5 flex items-center">
            <RatingStars showRatingNumberLabel={false} currentRating={rating} />
            <span className="ml-1.5 font-medium text-gray-400">
              ( {reviewsCount} reviews )
            </span>
            {/* <StockLabel stock={stock} /> */}
          </div>
          <div className="mb-6 flex gap-2 text-xl font-bold">
            <span>Price: ${price}</span>
            <span className="text-gray-400 line-through">
              ${priceBeforeDiscount}
            </span>
          </div>
          <ul className="mb-7 flex flex-col gap-2 text-lg font-medium">
            {haveFreeShipping && (
              <li className="flex items-center gap-2 text-blue-500">
                <ICONS_MAP.checkMark className="h-5 w-5" />
                <span>Free shipping available</span>
              </li>
            )}
            <li className="flex items-center gap-2 text-blue-500">
              <ICONS_MAP.checkMark className="h-5 w-5" />
              <span>Sales {roundedDiscount}% Off</span>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-6 flex items-center gap-4">
            <ButtonIcon
              icon="cart"
              ariaLabel="add to cart button"
              rounded="rounded-full"
            />
            <ButtonIcon
              icon="heart"
              ariaLabel="add to whitelist button"
              rounded="rounded-full"
            />
          </div>
          <div className="flex items-center gap-6">
            <ProductStockCount stock={stock} />
            <PurchaseProductBtn productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHero;
