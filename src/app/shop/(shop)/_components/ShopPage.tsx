import EmptyPage from "@/shared/components/common/EmptyPage";
import PageHeader from "@/shared/components/layouts/PageHeader";
import ShopLayout from "./ShopLayout";
import { cacheLife } from "next/cache";
import {
  getFilteredProducts,
  getFilteredProductsCount,
  getProductsMinMaxPrice,
} from "@/features/product/queries/products.queries";
import ClearFilters from "@/app/shop/(shop)/_components/filters/ClearFilters";
import SideBarCategoriesFilter from "@/app/shop/(shop)/_components/filters/SideBarCategoriesFilter";
import { getCategoriesWithProductsCount } from "@/features/category/queries/categories.queries";
import SideBarPriceRanger from "./filters/SideBarPriceRanger";
import { ShopSearchParams } from "./filters/filters.types";

async function getShopData(searchParams: ShopSearchParams) {
  "use cache";
  cacheLife("max");

  return await Promise.all([
    getFilteredProducts(searchParams),
    getFilteredProductsCount(searchParams),
    getCategoriesWithProductsCount(),
    getProductsMinMaxPrice(),
  ]);
}

async function ShopPage({ searchParams }: { searchParams: ShopSearchParams }) {
  const [
    products,
    productsCount,
    categoriesWithProductsCount,
    productMinMaxPrice,
  ] = await getShopData(searchParams);

  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore All Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <aside className="flex flex-col gap-9 lg:min-w-2xs">
          <ClearFilters />
          <SideBarCategoriesFilter categories={categoriesWithProductsCount} />
          <SideBarPriceRanger productMinMaxPrice={productMinMaxPrice} />
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
