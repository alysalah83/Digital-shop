"use client";

import { SEARCH_CACHE_TIME } from "@/app/shop/(shop)/_components/shop.consts";
import { ProductSummary } from "@/shared/product/types/product.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useSearchResults(
  query: string,
  initSearchResults: ProductSummary[],
) {
  const { data, error, isPending } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return res.json();
    },
    queryKey: ["searchItems", query],
    enabled: query.length > 0,
    staleTime: SEARCH_CACHE_TIME,
    placeholderData: query === "" ? initSearchResults : keepPreviousData,
  });

  return { searchProducts: data, error, isPending };
}
