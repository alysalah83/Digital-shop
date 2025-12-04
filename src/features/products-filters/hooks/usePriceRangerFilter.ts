"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePriceRangerFilter() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handlePriceChange = useCallback(
    ([newMinPrice, newMaxPrice]: readonly number[]) => {
      const params = new URLSearchParams(searchParams);
      const minPriceParam = Number(params.get("min"));
      const maxPriceParam = Number(params.get("max"));

      if (minPriceParam === newMinPrice && maxPriceParam === newMaxPrice)
        return;

      if (minPriceParam !== newMinPrice) params.set("min", String(newMinPrice));
      if (maxPriceParam !== newMaxPrice) params.set("max", String(newMaxPrice));

      params.delete("page");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, replace, searchParams]
  );

  return { handlePriceChange };
}
