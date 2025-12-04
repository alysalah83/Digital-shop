import { useEffect, useRef, useState } from "react";
import { PRICE_RANGER_STEP_SIZE } from "../consts/productsFilters.consts";
import { useRanger, Ranger } from "@tanstack/react-ranger";
import { usePriceRangerFilter } from "../hooks/usePriceRangerFilter";
import { useSearchParams } from "next/navigation";

function PriceRanger({
  initialMinPrice,
  initialMaxPrice,
}: {
  initialMinPrice: number;
  initialMaxPrice: number;
}) {
  const searchParams = useSearchParams();

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
          className="relative select-none h-2 bg-blue-400 rounded-md"
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
                i
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
                  className={`absolute top-1/2 ${isActive ? "z-10" : "z-0"} text-sm font-medium tabular-nums -translate-1/2 w-5 h-5 rounded-full cursor-pointer outline-0 bg-blue-600`}
                  style={{
                    left: `${rangerInstance.getPercentageForValue(value)}%`,
                  }}
                >
                  <span
                    className={`absolute -top-full -translate-y-2 left-1/2 -translate-x-1/2`}
                  >
                    {values.at(i)?.toFixed(2)}
                  </span>
                </button>
              )
            )}
        </div>
      </div>
      <div className="flex justify-between items-center pb-5 px-5 text-sm font-medium tabular-nums">
        {values.map((value, index) => (
          <div
            className="border border-gray-300 rounded-lg py-1 px-2 flex items-center gap-2"
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
