"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProductsSortBy from "@/features/product/components/ProductsSortBy";

import { LayoutShape } from "@/app/shop/(shop)/_components/shop.types";
import {
  PRODUCTS_LAYOUT_SHAPE_PARAM_KEY,
  PRODUCTS_LAYOUT_SHAPES,
} from "../consts/product.consts";

interface ShopHeaderProps {
  productsTotalCount: number;
  initLayoutShape: LayoutShape;
  productsPerPage: number;
}

function ProductsToolbar({
  productsTotalCount,
  initLayoutShape,
  productsPerPage,
}: ShopHeaderProps) {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const paramKey = PRODUCTS_LAYOUT_SHAPE_PARAM_KEY;
  const curLayoutShape = searchparams.get(paramKey) || initLayoutShape;

  const handleLayoutShapeChange = (newLayoutShape: LayoutShape) => {
    const params = new URLSearchParams(searchparams);

    const isParamExist = params.has(paramKey);
    if (isParamExist) {
      if (curLayoutShape === newLayoutShape) return;
      else params.set(paramKey, newLayoutShape);
    } else params.set(paramKey, newLayoutShape);

    push(`${pathname}?${params.toString()}`);
  };

  const page = Number(useSearchParams().get("page")) || 1;

  return (
    <div
      className={`mb-9 flex justify-between gap-2 rounded-md bg-white px-6 py-4 shadow-sm sm:px-8`}
    >
      <div className="flex flex-wrap items-center gap-2 lg:gap-4.5">
        <ProductsSortBy />
        <span className="font-medium text-gray-500">
          <span>Showed </span>
          <span className="font-bold text-gray-600">
            {productsPerPage * page}
          </span>
          <span> out of </span>
          <span className="font-bold text-gray-600">{productsTotalCount} </span>
          <span>products</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        {PRODUCTS_LAYOUT_SHAPES.map(({ icon, shape }) => (
          <ButtonIcon
            icon={icon}
            isActive={shape === curLayoutShape}
            ariaLabel={`layout ${shape} button`}
            onClick={() => handleLayoutShapeChange(shape)}
            key={shape}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductsToolbar;
