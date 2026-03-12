import { useEffect, useRef, useState } from "react";
import { useRanger, Ranger } from "@tanstack/react-ranger";
import { useSearchParams } from "next/navigation";
import { usePriceRangerFilter } from "./usePriceRangerFilter";
import { PRICE_RANGER_STEP_SIZE } from "./filters.consts";
import { ProductsMinMaxPrice } from "./filters.types";

function PriceRanger({
  productMinMaxPrice,
}: {
  productMinMaxPrice: ProductsMinMaxPrice;
}) {
  const searchParams = useSearchParams();
  const initialMinPrice = productMinMaxPrice.minPrice ?? 0;
  const initialMaxPrice = productMinMaxPrice.maxPrice ?? 9999;

  const rangerRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ReadonlyArray<number>>([
    Number(searchParams.get("min")) || initialMinPrice,
    Number(searchParams.get("max")) || initialMaxPrice,
  ]);
  const { handlePriceChange } = usePriceRangerFilter();

  // for resting client state after the server state changes
  useEffect(() => {
    if (searchParams.has("min") && searchParams.has("max")) return;

    setValues((curValues) => {
      const [curMinPrice, curMaxPrice] = curValues;
      if (curMinPrice === initialMinPrice && curMaxPrice === initialMaxPrice)
        return curValues;
      else return [initialMinPrice, initialMaxPrice];
    });
  }, [initialMinPrice, initialMaxPrice, searchParams]);

  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values,
    min: initialMinPrice,
    max: initialMaxPrice,
    stepSize: PRICE_RANGER_STEP_SIZE,
    onChange: (instance: Ranger<HTMLDivElement>) => {
      handlePriceChange(instance.sortedValues);
      setValues(instance.sortedValues);
    },
  });

  return (
    <>
      <div className="px-10 pt-8">
        <div
          ref={rangerRef}
          className="relative h-2 rounded-md bg-blue-400 select-none"
        >
          {rangerInstance
            .handles()
            .map(
              (
                {
                  value,
                  onKeyDownHandler,
                  onMouseDownHandler,
                  onTouchStart,
                  isActive,
                },
                i,
              ) => (
                <button
                  type="button"
                  title="price ranger button"
                  key={i}
                  onKeyDown={onKeyDownHandler}
                  onMouseDown={onMouseDownHandler}
                  onTouchStart={onTouchStart}
                  role="slider"
                  aria-valuemin={rangerInstance.options.min}
                  aria-valuemax={rangerInstance.options.max}
                  aria-valuenow={value}
                  className={`absolute top-1/2 ${isActive ? "z-10" : "z-0"} h-5 w-5 -translate-1/2 cursor-pointer rounded-full bg-blue-600 text-sm font-medium tabular-nums outline-0`}
                  style={{
                    left: `${rangerInstance.getPercentageForValue(value)}%`,
                  }}
                >
                  <span
                    className={`absolute -top-full left-1/2 -translate-x-1/2 -translate-y-2`}
                  >
                    {values.at(i)?.toFixed(2)}
                  </span>
                </button>
              ),
            )}
        </div>
      </div>
      <div className="flex items-center justify-between px-5 pb-5 text-sm font-medium tabular-nums">
        {values.map((value, index) => (
          <div
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-1"
            key={index}
          >
            <span className="border-r border-gray-300 pr-2">$</span>
            <span>{value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default PriceRanger;
