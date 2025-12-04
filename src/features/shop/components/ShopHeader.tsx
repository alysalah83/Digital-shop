"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { LayoutShape } from "../types/shop.types";
import {
  INITIAL_LAYOUT_SHAPE,
  PAGINATION_ITEMS_PER_PAGE,
  PRODUCTS_LAYOUT,
} from "../consts/shop.consts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PriceSortbyDir from "@/features/products-filters/components/ProductsSortBy";

interface ShopHeaderProps {
  productsTotalCount: number;
}

const paramKey = "layoutShape";

function ShopHeader({ productsTotalCount }: ShopHeaderProps) {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const curLayoutShape = searchparams.get(paramKey) || INITIAL_LAYOUT_SHAPE;

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
        <PriceSortbyDir />
        <span className="font-medium text-gray-500">
          <span>Showed </span>
          <span className="font-bold text-gray-600">
            {PAGINATION_ITEMS_PER_PAGE * page}
          </span>
          <span> out of </span>
          <span className="font-bold text-gray-600">{productsTotalCount} </span>
          <span>products</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        {PRODUCTS_LAYOUT.map(({ icon, shape }) => (
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

export default ShopHeader;
