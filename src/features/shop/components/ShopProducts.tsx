import Pagination from "@/components/ui/Pagination";
import ProductCard from "@/shared/product/components/ProductCard";
import { ProductSummaryWithDescription } from "@/shared/product/types/product.type";
import {
  INITIAL_LAYOUT_SHAPE,
  PAGINATION_ITEMS_PER_PAGE,
} from "../consts/shop.consts";
import ShopHeader from "./ShopHeader";
import HorizontalProductCard from "@/shared/product/components/HorizontalProductCard";

function ShopProducts({
  products,
  productsTotalCount,
  layoutShape,
}: {
  products: ProductSummaryWithDescription[];
  productsTotalCount: number;
  layoutShape?: string;
}) {
  const curLayoutShape = layoutShape || INITIAL_LAYOUT_SHAPE;

  return (
    <main className="w-full">
      <ShopHeader productsTotalCount={productsTotalCount} />
      <div
        className={`mb-16 grid ${curLayoutShape === "verticalCard" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-rows-1"} gap-8 lg:mb-20`}
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
        totalItemsCount={productsTotalCount}
        itemsPerPageCount={PAGINATION_ITEMS_PER_PAGE}
      />
    </main>
  );
}

export default ShopProducts;
