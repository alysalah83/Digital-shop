import { ShopSearchParams } from "./shop.types";
import EmptyPage from "@/shared/components/common/EmptyPage";
import PageHeader from "@/shared/components/layouts/PageHeader";
import ShopLayout from "./ShopLayout";
import { cacheLife } from "next/cache";
import {
  getFilteredProducts,
  getProductsCount,
  getProductsMinMaxPrice,
} from "@/features/product/queries/products.queries";
import ClearFilters from "@/app/shop/(shop)/_components/filters/ClearFilters";
import SideBarCategoriesFilter from "@/app/shop/(shop)/_components/filters/SideBarCategoriesFilter";
import PriceRanger from "@/app/shop/(shop)/_components/filters/PriceRanger";
import { getCategoriesWithProductsCount } from "@/features/category/queries/categories.queries";

async function ShopPage({ searchParams }: { searchParams: ShopSearchParams }) {
  "use cache";
  cacheLife("max");

  const [
    products,
    productsCount,
    categoriesWithProductsCount,
    productMinMaxPrice,
  ] = await Promise.all([
    getFilteredProducts(searchParams),
    getProductsCount(searchParams),
    getCategoriesWithProductsCount(),
    getProductsMinMaxPrice(),
  ]);

  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore All Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <aside className="flex flex-col gap-9 lg:min-w-2xs">
          <ClearFilters />
          <SideBarCategoriesFilter categories={categoriesWithProductsCount} />
          <PriceRanger productMinMaxPrice={productMinMaxPrice} />
        </aside>

        {products.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-6">
            <EmptyPage icon="shoppingBag" label="No products to display" />
          </div>
        ) : (
          <ShopLayout
            products={products}
            productsTotalCount={productsCount}
            layoutShape={searchParams.layoutShape}
          />
        )}
      </div>
    </div>
  );
}

export default ShopPage;
