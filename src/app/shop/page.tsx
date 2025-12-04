import EmptyPage from "@/components/common/EmptyPage";
import PageHeader from "@/components/layouts/PageHeader";
import ProductsSideBarFilters from "@/features/products-filters/components/ProductsSideBarFilters";
import { SelectFilterValue } from "@/features/products-filters/types/productFilters.types";
import ShopProducts from "@/features/shop/components/ShopProducts";
import { PAGINATION_ITEMS_PER_PAGE } from "@/features/shop/consts/shop.consts";
import prisma from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Shop",
};

async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    page?: string;
    sortBy?: SelectFilterValue;
    min?: string;
    max?: string;
    layoutShape?: string;
  }>;
}) {
  const params = await searchParams;
  const { products, totalCount } = await getShopProducts(params);

  if (!products) return notFound();

  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore All Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <ProductsSideBarFilters />

        {products.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-6">
            <EmptyPage icon="shoppingBag" label="No products to display" />
          </div>
        ) : (
          <ShopProducts
            products={products}
            productsTotalCount={totalCount}
            layoutShape={params.layoutShape}
          />
        )}
      </div>
    </div>
  );
}

export default ShopPage;

async function getShopProducts({
  category,
  page,
  sortBy,
  min,
  max,
}: {
  category?: string;
  page?: string;
  sortBy?: SelectFilterValue;
  min?: string;
  max?: string;
  layoutShape?: string;
}) {
  "use cache";
  const pageNum = Number(page) || 1;

  cacheTag("shopProducts");
  cacheLife("hours");

  const select = {
    id: true,
    name: true,
    image: true,
    price: true,
    rating: true,
    discountPercentage: true,
    brand: true,
    description: true,
  };
  const price = {
    gte: Number(min) || undefined,
    lte: Number(max) || undefined,
  };

  const getOrderBy = () => {
    if (!sortBy) return undefined;
    const [filterFor, filterDir] = sortBy.split("_");
    return {
      [filterFor]: filterDir,
    };
  };

  const categoryFilterArr = category?.split(",").filter(Boolean);
  const where = category
    ? {
        category: {
          name: { in: categoryFilterArr },
        },
        price,
      }
    : { price };

  const [products, productsCount] = await Promise.all([
    prisma.product.findMany({
      select,
      where,
      orderBy: getOrderBy(),
      skip: (pageNum - 1) * PAGINATION_ITEMS_PER_PAGE,
      take: PAGINATION_ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, totalCount: productsCount };
}
