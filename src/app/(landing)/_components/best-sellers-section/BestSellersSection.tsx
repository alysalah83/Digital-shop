import Link from "next/link";
import LandingSectionHeader from "@/app/(landing)/_components/shared/LandingSectionHeader";
import Button from "@/shared/components/common/Button";
import { cacheLife } from "next/cache";
import { getProducts } from "@/features/product/queries/products.queries";
import { BEST_SELLERS_PRODUCTS_COUNT } from "./best-sellers.consts";
import ProductCard from "@/features/product/components/ProductCard";

async function getBestSellersProducts() {
  "use cache";
  cacheLife("max");

  return await getProducts({
    orderBy: {
      rating: "desc",
    },
    take: BEST_SELLERS_PRODUCTS_COUNT,
  });
}

async function BestSellersSection() {
  const products = await getBestSellersProducts();

  return (
    <section>
      <div className="mx-auto mt-16 max-w-7xl p-6 pt-0">
        <LandingSectionHeader
          title="This Month"
          label="Best Sellers"
          icon="shoppingBag"
        />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard product={product} variant="reverse" key={product.id} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/popular">
            <Button size="large" type="secondary">
              view all
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BestSellersSection;
