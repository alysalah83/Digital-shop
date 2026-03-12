import PageHeader from "@/shared/components/layouts/PageHeader";
import PopularProducts from "@/shared/components/layouts/PopularProducts";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/shop/(shop)/_components/shop.consts";
import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export const metadata = {
  title: "Popular",
};

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; layoutShape?: string }>;
}) {
  const params = await searchParams;
  const pageNum = Number(params.page) || 1;
  const [products, productsCount] = await getProducts(pageNum);

  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore Popular Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <PopularProducts
          searchParams={params}
          products={products}
          productsCount={productsCount}
        />
      </div>
    </div>
  );
}

async function getProducts(pageNum: number) {
  "use cache";

  cacheLife("hours");

  cacheTag();
  return await Promise.all([
    prisma.product.findMany({
      where: {
        rating: { gte: 4 },
      },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        rating: true,
        discountPercentage: true,
        brand: true,
        description: true,
      },
      skip: (pageNum - 1) * PAGINATION_ITEMS_PER_PAGE,
      take: PAGINATION_ITEMS_PER_PAGE,
    }),
    prisma.product.count(),
  ]);
}

export default page;
