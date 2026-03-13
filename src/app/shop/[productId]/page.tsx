import PageHeader from "@/shared/components/layouts/PageHeader";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductHero from "@/app/shop/[productId]/_components/ProductHero";
import ProductTabs from "./_components/ProductTabs";
import { getProductWithReviews } from "@/features/product/queries/product.quries";

export async function generateStaticParams() {
  const productIds = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return productIds.map((product) => ({
    productId: String(product.id),
  }));
}

export const metadata = {
  title: "Product",
};

async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await getProductWithReviews(Number(productId));

  if (!product) return notFound();

  return (
    <div>
      <PageHeader heading="product details" />
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <ProductHero product={product} />
      </main>
      <div className="bg-gray-100">
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <ProductTabs
            id={product.id}
            reviews={product.reviews}
            description={product.description}
          />
        </section>
      </div>
    </div>
  );
}

export default ProductPage;
