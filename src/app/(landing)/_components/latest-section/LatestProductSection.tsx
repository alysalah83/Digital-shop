"use cache";
cacheLife("max");

import Button from "@/shared/components/common/Button";
import LandingSectionHeader from "@/app/(landing)/_components/shared/LandingSectionHeader";
import Link from "next/link";
import { getProducts } from "@/features/product/queries/products.queries";
import { LATEST_SECTION_PRODUCTS_COUNT } from "./latestProduct.consts";
import ProductCard from "@/features/product/components/ProductCard";
import { cacheLife } from "next/cache";

async function LatestProductSection() {
  const products = await getProducts({
    orderBy: { createdAt: "desc" },
    take: LATEST_SECTION_PRODUCTS_COUNT,
  });

  return (
    <section>
      <div className="mx-auto mt-5 max-w-7xl border-t border-gray-300 p-6 pt-15">
        <LandingSectionHeader
          title="new arrivals"
          label="this weak's"
          icon="bag"
          button={
            <Link href="/shop?date=latestProducts">
              <Button type="secondary" size="large">
                view all
              </Button>
            </Link>
          }
        />
        <main className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((newProduct) => (
            <ProductCard product={newProduct} key={newProduct.id} />
          ))}
        </main>
      </div>
    </section>
  );
}

export default LatestProductSection;
