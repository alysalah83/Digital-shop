"use client";

import { PriceMinMax } from "./filters.types";
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
    <div className="flex flex-col gap-6 rounded-md bg-white text-slate-500 shadow-md">
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
