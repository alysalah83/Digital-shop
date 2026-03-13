import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../../features/product/types/product.type";

function ProductHeroCard({ product }: { product: Product }) {
  const { name, price, discountPercentage, image, id } = product;

  const beforeOffer = Math.round(price + price / discountPercentage);

  return (
    <div className="group flex max-h-80 gap-4 rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <div className="flex flex-2 flex-col">
        <div className="mb-2 inline-block w-fit rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
          {Math.round(discountPercentage)}% OFF
        </div>

        <h3 className="text-xl font-bold text-gray-800 capitalize">
          <Link href={`/shop/${id}`} className="cursor-pointer">
            {name}
          </Link>
        </h3>

        <div className="mt-auto flex flex-col gap-1 pt-3">
          <span className="text-sm tracking-wider text-gray-400 uppercase">
            limited time offer
          </span>
          <p className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-red-600">
              ${price}
            </span>
            <span className="font-medium text-gray-500 line-through">
              ${beforeOffer}
            </span>
          </p>
        </div>
      </div>
      <div className="relative aspect-square flex-grow overflow-hidden rounded-lg bg-gray-50 p-2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-40" />
        <Link href={`/shop/${id}`} className="cursor-pointer">
          <Image
            src={image}
            fill
            alt={`${name} image`}
            style={{ objectFit: "contain" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
    </div>
  );
}

export default ProductHeroCard;
