import {
  getProducts,
  getProductsCount,
} from "@/features/product/queries/products.queries";
import { ProductsLayoutShape } from "@/features/product/types/product.type";
import PageHeader from "@/shared/components/layouts/PageHeader";
import PopularProducts from "@/app/popular/_components/PopularProducts";
import { cacheLife } from "next/cache";
import { PAGINATION_ITEMS_PER_PAGE } from "./popular.consts";

async function PopularPage({
  page,
  layoutShape,
}: {
  page: number;
  layoutShape?: ProductsLayoutShape;
}) {
  "use cache";
  cacheLife("max");

  const [products, productsCount] = await Promise.all([
    getProducts({
      where: { rating: { gte: 4 } },
      take: PAGINATION_ITEMS_PER_PAGE,
      skip: (page - 1) * PAGINATION_ITEMS_PER_PAGE,
    }),
    getProductsCount(),
  ]);

  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore Popular Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <PopularProducts
          layoutShape={layoutShape}
          products={products}
          productsCount={productsCount}
        />
      </div>
    </div>
  );
}

export default PopularPage;
