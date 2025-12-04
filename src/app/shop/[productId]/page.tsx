import PageHeader from "@/components/layouts/PageHeader";
import DetailsTaps from "@/features/Product-details/components/DetailsTaps";
import prisma from "@/lib/prisma";
import ProductWithDetails from "@/shared/product/components/ProductWithDetails";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return products.map((product) => ({
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

  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
    include: {
      reviews: true,
    },
  });

  if (!product) return notFound();

  return (
    <div>
      <PageHeader heading="product details" />
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* <ProductMain productId={productId} /> */}
        <ProductWithDetails product={product} />
      </main>
      <div className="bg-gray-100">
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-10">
          <DetailsTaps
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
