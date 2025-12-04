import prisma from "@/lib/prisma";
import {
  BEST_OFFERS_MINI_CARDS,
  BEST_OFFERS_PRODUCTS_COUNT,
} from "../consts/main.consts";
import ProductColoredCard from "@/shared/product/components/ProductColoredCard";
import Button from "@/components/common/Button";

async function BestOffersSection() {
  "use cache";

  const products = await prisma.product.findMany({
    orderBy: {
      discountPercentage: "desc",
    },
    take: BEST_OFFERS_PRODUCTS_COUNT,
    select: {
      name: true,
      price: true,
      discountPercentage: true,
      image: true,
      id: true,
      description: true,
    },
  });

  return (
    <section>
      <div className="mx-auto mt-5 max-w-7xl p-6 pt-15">
        <div className="grid grid-rows-3 gap-8 lg:grid-cols-2 lg:grid-rows-2">
          <ProductColoredCard
            product={products.at(0)}
            type="primary"
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
                product={products.at(index + 1)}
                type="secondary"
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
