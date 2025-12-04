import ProductMiniDiscountCard from "@/shared/product/components/ProductMiniDiscountCard";
import ProductSlider from "./SliderProductCard";
import OrderFeaturesBar from "./OrderFeaturesBar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  DISCOUNT_CARDS_COUNT,
  SLIDER_CARDS_COUNT,
} from "../consts/main.consts";

async function MainSection() {
  "use cache";

  const products = await prisma.product.findMany({
    orderBy: {
      discountPercentage: "desc",
    },
    take: SLIDER_CARDS_COUNT + DISCOUNT_CARDS_COUNT,
    select: {
      name: true,
      price: true,
      discountPercentage: true,
      image: true,
      id: true,
      description: true,
    },
  });

  if (!products) return notFound();

  return (
    <section className="flex-2 bg-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid-rows-[2fr 1fr 1fr 0.5fr] sm:grid-row-[3fr 2fr 1fr] grid gap-6 p-5 sm:grid-cols-2">
          <ProductSlider products={products.slice(0, SLIDER_CARDS_COUNT)} />
          {products
            .slice(
              SLIDER_CARDS_COUNT,
              SLIDER_CARDS_COUNT + DISCOUNT_CARDS_COUNT,
            )
            .map((product) => (
              <ProductMiniDiscountCard product={product} key={product.id} />
            ))}

          <OrderFeaturesBar />
        </div>
      </div>
    </section>
  );
}

export default MainSection;
