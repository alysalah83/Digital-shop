"use client";

import { ICONS_MAP } from "@/consts/iconsMap";
import React, { useCallback, useState } from "react";

interface ProductStockCountProps {
  stock: number;
  initialCount?: number;
  setOutSideCount?: React.Dispatch<React.SetStateAction<number>>;
}

function ProductStockCount({
  stock,
  setOutSideCount,
  initialCount = 1,
}: ProductStockCountProps) {
  const [count, setCount] = useState(initialCount);

  const handleIncreaseCount = useCallback(() => {
    if (count >= stock) return;
    const newCount = count === stock ? count : count + 1;
    setCount(newCount);
    setOutSideCount?.(newCount);
  }, [stock, count, setOutSideCount]);

  const handleDecreaseCount = useCallback(() => {
    if (count <= 1) return;
    const newCount = count - 1;
    setCount(newCount);
    setOutSideCount?.(newCount);
  }, [count, setOutSideCount]);

  return (
    <div className="flex w-fit items-center rounded-md border border-gray-200">
      <button
        type="button"
        aria-label="decrease stock count"
        onClick={handleDecreaseCount}
        className="group/stock cursor-pointer border-r border-gray-200 px-4 py-2 select-none"
      >
        <ICONS_MAP.minus className="size-4 text-gray-500 transition duration-300 group-hover/stock:text-blue-500" />
      </button>
      <span className="px-4 py-2 font-semibold text-gray-500 tabular-nums">
        {count}
      </span>
      <button
        type="button"
        aria-label="increase stock count"
        onClick={handleIncreaseCount}
        className="group/stock cursor-pointer border-l border-gray-200 px-4 py-2 select-none"
      >
        <ICONS_MAP.plus className="size-4 text-gray-500 transition duration-300 group-hover/stock:text-blue-500" />
      </button>
    </div>
  );
}

export default ProductStockCount;
