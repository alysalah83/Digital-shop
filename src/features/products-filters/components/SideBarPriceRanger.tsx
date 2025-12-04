"use client";

import { PriceMinMax } from "../types/productFilters.types";
import ToggleVisibilityRow from "./ToggleVisibilityRow";
import PriceRanger from "./PriceRanger";
import { use, useState } from "react";

function SideBarPriceRanger({
  PriceMinMaxPromise,
}: {
  PriceMinMaxPromise: Promise<PriceMinMax>;
}) {
  const {
    _max: { price: maxPrice },
    _min: { price: minPrice },
  } = use(PriceMinMaxPromise);

  const [isVisible, setIsVisible] = useState(true);

  if (!minPrice || !maxPrice) return;

  return (
    <div className="rounded-md flex flex-col gap-6 bg-white shadow-md text-slate-500">
      <ToggleVisibilityRow
        label="Price"
        isVisible={isVisible}
        onToggle={() => setIsVisible((cur) => !cur)}
      />
      {isVisible && (
        <PriceRanger initialMinPrice={minPrice} initialMaxPrice={maxPrice} />
      )}
    </div>
  );
}

export default SideBarPriceRanger;
