import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../../features/product/types/product.type";

interface ProductColoredCardProps {
  product: Product;
  variant: "primary" | "secondary";
  bgColorClasses: string;
  button: React.ReactNode;
}

function ProductColoredCard({
  product,
  variant,
  bgColorClasses,
  button,
}: ProductColoredCardProps) {
  if (!product) return;

  const { image, name, discountPercentage, description, id } = product;

  return (
    <div
      className={`relative overflow-hidden rounded-lg p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl ${bgColorClasses} ${
        variant === "primary" ? "lg:col-span-2" : ""
      } lg:p-12`}
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="relative z-10 flex w-full flex-col sm:w-3/5 lg:w-2/3">
          <span className="mb-2 inline-block text-xl font-semibold">
            {name}
          </span>
          <h2 className="mb-4 text-2xl font-bold tracking-wide uppercase">
            up to {Math.round(discountPercentage)}% offer
          </h2>
          <p className="mb-6 text-gray-600 lg:text-lg">{description}</p>
          <Link href={`/shop/${id}`} className="mt-auto">
            {button}
          </Link>
        </div>
        <div className="mt-6 flex justify-center sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:w-2/5 sm:justify-end lg:w-1/3">
          <div className="relative h-[250px] w-[250px] lg:h-[350px] lg:w-[350px]">
            <Image
              src={image}
              fill
              alt={`${name} image`}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductColoredCard;
