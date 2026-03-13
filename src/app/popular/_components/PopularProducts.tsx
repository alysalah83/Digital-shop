import Pagination from "../../../shared/components/ui/Pagination";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/shop/(shop)/_components/shop.consts";
import {
  Product,
  ProductsLayoutShape,
} from "@/features/product/types/product.type";
import { DEFAULT_LAYOUT_SHAPE } from "./popular.consts";
import ProductsToolbar from "@/features/product/components/ProductsToolbar";
import ProductCard from "@/features/product/components/ProductCard";
import ProductRow from "@/features/product/components/ProductRow";

interface PopularProductsProps {
  layoutShape?: ProductsLayoutShape;
  products: Product[];
  productsCount: number;
}

function PopularProducts({
  layoutShape,
  products,
  productsCount,
}: PopularProductsProps) {
  const curLayoutShape = layoutShape || DEFAULT_LAYOUT_SHAPE;

  return (
    <main className="w-full">
      <ProductsToolbar
        productsPerPage={PAGINATION_ITEMS_PER_PAGE}
        initLayoutShape={DEFAULT_LAYOUT_SHAPE}
        productsTotalCount={productsCount}
      />
      <div
        className={`mb-16 grid ${curLayoutShape === "verticalCard" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-rows-1"} gap-8 lg:mb-20`}
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
        totalItemsCount={productsCount}
        itemsPerPageCount={PAGINATION_ITEMS_PER_PAGE}
      />
    </main>
  );
}

export default PopularProducts;
