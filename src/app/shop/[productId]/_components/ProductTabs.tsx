"use client";

import { useState } from "react";
import { PRODUCT_TABS } from "./productDetail.consts";
import type { ProductTabs } from "./ProductDetail.types";
import type { Review } from "./review/types/review.types.ts";
import { Reviews } from "./review";

function ProductTabs({
  id,
  reviews,
  description,
}: {
  id: number;
  reviews: Review[];
  description: string;
}) {
  const [activeTap, setActiveTap] = useState<ProductTabs>("reviews");

  const handleActiveTap = (tapName: ProductTabs) => setActiveTap(tapName);

  return (
    <div>
      <menu className="mb-9 flex flex-wrap items-center gap-6 rounded-md bg-white px-7 py-5 shadow-sm">
        {PRODUCT_TABS.map((tapName) => {
          const isActive = activeTap === tapName;
          return (
            <li
              className="relative"
              onClick={() => handleActiveTap(tapName)}
              key={`title-${tapName}`}
            >
              <span
                className={`peer cursor-pointer font-bold tracking-wide ${isActive ? "text-blue-700" : "text-gray-600"} capitalize transition duration-300 hover:text-blue-700 sm:text-lg sm:font-semibold lg:text-xl`}
              >
                {tapName}
              </span>
              <span
                className={`h-[2px] rounded-sm text-start ${isActive ? "w-full" : "w-0"} absolute -bottom-1 left-0 bg-blue-700 transition-all duration-300 peer-hover:w-full`}
              />
            </li>
          );
        })}
      </menu>
      <section>
        {activeTap === "reviews" && (
          <Reviews reviews={reviews} productId={id} />
        )}
        {activeTap === "description" && (
          <div className="w-full max-w-2xl px-7 py-5">
            <h3 className="mb-7 text-xl font-semibold capitalize lg:text-2xl lg:font-medium">
              specifications:
            </h3>
            <p className="text-lg text-gray-500">{description}</p>
          </div>
        )}
        {activeTap === "additional information" && (
          <div className="mb-6 w-full rounded-lg bg-white px-7 py-5 text-lg font-medium text-gray-500 capitalize">
            no {activeTap}.
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductTabs;
