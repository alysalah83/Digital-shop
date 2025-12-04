import Link from "next/link";
import LandingSectionHeader from "@/components/layouts/LandingSectionHeader";
import Button from "@/components/common/Button";
import prisma from "@/lib/prisma";
import { BEST_SELLERS_PRODUCTS_COUNT } from "../consts/main.consts";
import ProductCard from "@/shared/product/components/ProductCard";
import { notFound } from "next/navigation";

async function getBestSellersProducts() {
  "use cache";
  const products = await prisma.product.findMany({
    orderBy: {
      rating: "desc",
    },
    take: BEST_SELLERS_PRODUCTS_COUNT,
    select: {
      name: true,
      price: true,
      discountPercentage: true,
      image: true,
      id: true,
      brand: true,
      rating: true,
      description: true,
    },
  });

  return products;
}

async function BestSellersSection() {
  const products = await getBestSellersProducts();
  if (!products) return notFound();

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
            <ProductCard product={product} reverse={true} key={product.id} />
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
