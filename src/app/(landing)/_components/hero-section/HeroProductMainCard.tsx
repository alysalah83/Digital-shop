import Image from "next/image";
import hero from "@/../public/hero-bg.png";
import Link from "next/link";
import Button from "@/shared/components/common/Button";
import { Product } from "@/features/product/types/product.type";

function HeroProductMainCard({ product }: { product: Product }) {
  const { name, discountPercentage, image, description, id } = product;
  return (
    <div className="relative flex w-full flex-wrap gap-5 overflow-hidden">
      <div className="z-10 order-2 flex w-full min-w-0 flex-col sm:order-1 sm:flex-1">
        <div className="mb-12 flex items-center justify-start gap-4">
          <div className="relative overflow-hidden rounded-lg bg-blue-50 p-4">
            <span className="relative z-10 text-6xl font-bold text-blue-800">
              {Math.round(discountPercentage)}%
            </span>
            <div className="absolute inset-0 z-0 opacity-20">
              <Image
                src={hero}
                alt="hero background"
                fill
                sizes="100px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
          <span className="text-xl font-semibold text-blue-900">Sale Off</span>
        </div>
        <h3 className="mb-6 text-3xl font-bold text-gray-800 capitalize">
          {name}
        </h3>
        <p className="mb-10 text-lg leading-relaxed text-gray-500">
          {description}
        </p>
        <Link href={`/shop/${id}`}>
          <Button size="large">Shop Now</Button>
        </Link>
      </div>

      <div className="relative order-1 mx-auto aspect-square w-full max-w-xs min-w-[150px] sm:order-2 sm:mx-0 sm:w-auto sm:flex-grow">
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-30 sm:opacity-50" />
        <Image
          src={image}
          alt={`${name} image`}
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          style={{ objectFit: "contain" }}
          className="p-4 drop-shadow-xl transition-transform duration-300 hover:scale-105"
          draggable={false}
        />
      </div>

      <span className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-100 opacity-20" />
      <span className="absolute -right-10 -bottom-10 h-60 w-60 rounded-full bg-blue-100 opacity-20" />
    </div>
  );
}

export default HeroProductMainCard;
