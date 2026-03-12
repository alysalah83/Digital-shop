import Pagination from "@/shared/components/ui/Pagination";
import {
  PAGINATION_ITEMS_PER_PAGE,
  SHOP_DEFAULT_LAYOUT_SHAPE,
} from "./shop.consts";
import ProductRow from "../../../../features/product/components/ProductRow";
import ProductCard from "../../../../features/product/components/ProductCard";
import { Product } from "../../../../features/product/types/product.type";
import ProductsToolbar from "@/features/product/components/ProductsToolbar";

function ShopLayout({
  products,
  productsTotalCount,
  layoutShape,
}: {
  products: Product[];
  productsTotalCount: number;
  layoutShape?: string;
}) {
  const curLayoutShape = layoutShape ?? SHOP_DEFAULT_LAYOUT_SHAPE;

  return (
    <main className="w-full">
      <ProductsToolbar
        productsTotalCount={productsTotalCount}
        initLayoutShape={SHOP_DEFAULT_LAYOUT_SHAPE}
        productsPerPage={PAGINATION_ITEMS_PER_PAGE}
      />
      <div
        className={`mb-16 grid ${curLayoutShape === "verticalCard" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-rows-1"} gap-8 lg:mb-20`}
      >
        {products.map((product) =>
          curLayoutShape === "verticalCard" ? (
            <ProductCard product={product} key={product.id} />
          ) : (
            <ProductRow product={product} key={product.id} />
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

export default ShopLayout;
