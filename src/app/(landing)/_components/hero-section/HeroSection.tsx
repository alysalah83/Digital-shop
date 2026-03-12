"use cache";
cacheLife("max");

import ProductSlider from "./HeroProductsSlider";
import OrderFeaturesBar from "./OrderFeaturesBar";
import { getProducts } from "@/features/product/queries/products.queries";
import { cacheLife } from "next/cache";

import HeroProductCard from "@/app/(landing)/_components/hero-section/HeroProductCard";
import {
  HERO_DISCOUNT_CARDS_COUNT,
  HERO_SLIDER_CARDS_COUNT,
} from "./hero.consts";

async function HeroSection() {
  const products = await getProducts({
    orderBy: { discountPercentage: "desc" },
    take: HERO_SLIDER_CARDS_COUNT + HERO_DISCOUNT_CARDS_COUNT,
  });

  return (
    <section className="flex-2 bg-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid-rows-[2fr 1fr 1fr 0.5fr] sm:grid-row-[3fr 2fr 1fr] grid gap-6 p-5 sm:grid-cols-2">
          <ProductSlider
            products={products.slice(0, HERO_SLIDER_CARDS_COUNT)}
          />
          {products
            .slice(
              HERO_SLIDER_CARDS_COUNT,
              HERO_SLIDER_CARDS_COUNT + HERO_DISCOUNT_CARDS_COUNT,
            )
            .map((product) => (
              <HeroProductCard product={product} key={product.id} />
            ))}

          <OrderFeaturesBar />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
