import Button from "@/shared/components/common/Button";
import { cacheLife } from "next/cache";
import { getProducts } from "@/features/product/queries/products.queries";
import {
  BEST_OFFERS_MINI_CARDS,
  BEST_OFFERS_PRODUCTS_COUNT,
} from "./best-offer.consts";
import ProductColoredCard from "@/app/(landing)/_components/best-offer-section/ProductColoredCard";

async function BestOffersSection() {
  "use cache";
  cacheLife("max");

  const products = await getProducts({
    orderBy: {
      discountPercentage: "desc",
    },
    take: BEST_OFFERS_PRODUCTS_COUNT,
  });

  return (
    <section>
      <div className="mx-auto mt-5 max-w-7xl p-6 pt-15">
        <div className="grid grid-rows-3 gap-8 lg:grid-cols-2 lg:grid-rows-2">
          <ProductColoredCard
            product={products[0]}
            variant="primary"
            bgColorClasses="bg-gradient-to-br from-amber-500 to-sky-500"
            button={
              <Button
                bgColor={`bg-gradient-to-br from-amber-600 to-sky-600 hover:from-amber-500 hover:to-sky-500`}
                size="large"
              >
                Buy Now
              </Button>
            }
          />
          {BEST_OFFERS_MINI_CARDS.map(
            ({ bgColor, buttonColor, buttonHoverColor }, index) => (
              <ProductColoredCard
                product={products[index + 1]}
                variant="secondary"
                bgColorClasses={bgColor}
                button={
                  <Button
                    bgColor={`${buttonColor} ${buttonHoverColor}`}
                    size="large"
                  >
                    Buy Now
                  </Button>
                }
                key={products.at(index + 1)?.id}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default BestOffersSection;
