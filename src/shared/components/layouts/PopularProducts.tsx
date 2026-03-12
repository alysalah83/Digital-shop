import ShopHeader from "@/features/product/components/shop/components/ShopHeader";
import HorizontalProductCard from "@/shared/product/components/HorizontalProductCard";
import ProductCard from "@/shared/product/components/ProductCard";
import Pagination from "../ui/Pagination";
import {
  INITIAL_LAYOUT_SHAPE,
  PAGINATION_ITEMS_PER_PAGE,
} from "@/app/shop/(shop)/_components/shop.consts";
import { ProductSummaryWithDescription } from "@/shared/product/types/product.type";

interface PopularProductsProps {
  searchParams: { layoutShape?: string };
  products: ProductSummaryWithDescription[];
  productsCount: number;
}

function PopularProducts({
  searchParams,
  products,
  productsCount,
}: PopularProductsProps) {
  const { layoutShape } = searchParams;
  const curLayoutShape = layoutShape || INITIAL_LAYOUT_SHAPE;

  return (
    <main className="w-full">
      <ShopHeader productsTotalCount={productsCount} />
      <div
        className={`mb-16 grid ${curLayoutShape === "verticalCard" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-rows-1"} gap-8 lg:mb-20`}
      >
        {products.map((product) =>
          curLayoutShape === "verticalCard" ? (
            <ProductCard product={product} key={product.id} />
          ) : (
            <HorizontalProductCard productItem={product} key={product.id} />
          ),
        )}
      </div>

      <Pagination
        totalItemsCount={productsCount}
        itemsPerPageCount={PAGINATION_ITEMS_PER_PAGE}
      />
    </main>
  );
}

export default PopularProducts;
