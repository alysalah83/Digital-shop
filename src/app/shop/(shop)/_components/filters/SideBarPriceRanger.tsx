"use client";

import { ProductsMinMaxPrice } from "./filters.types";
import ToggleVisibilityRow from "./ToggleVisibilityRow";
import PriceRanger from "./PriceRanger";
import { useState } from "react";

function SideBarPriceRanger({
  productMinMaxPrice,
}: {
  productMinMaxPrice: ProductsMinMaxPrice;
}) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col gap-6 rounded-md bg-white text-slate-500 shadow-md">
      <ToggleVisibilityRow
        label="Price"
        isVisible={isVisible}
        onToggle={() => setIsVisible((cur) => !cur)}
      />
      {isVisible && <PriceRanger productMinMaxPrice={productMinMaxPrice} />}
    </div>
  );
}

export default SideBarPriceRanger;
