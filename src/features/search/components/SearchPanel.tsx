"use client";

import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { useSearchResults } from "../hooks/useSearchResults";
import { useState } from "react";
import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { Product } from "@/features/product/types/product.type";
import ProductSearchItem from "@/features/product/components/ProductSearchCard";

interface SearchItemsProps {
  searchResults: Product[];
  searchQuery: string;
}

function SearchPanel({ initSearchResults }: { initSearchResults: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchProducts, isPending } = useSearchResults(
    searchQuery,
    initSearchResults,
  );

  return (
    <div className="fixed top-1/2 left-1/2 z-50 mx-auto h-11/12 min-w-11/12 -translate-1/2 overflow-y-auto rounded-xl bg-white px-6 py-8 shadow-lg md:px-8 lg:p-16 xl:min-w-7xl">
      <div className="relative mb-10">
        <input
          className="w-full rounded-lg border border-gray-300 px-10 py-3 text-lg text-gray-600 outline-0 transition duration-300 focus:ring-2 focus:ring-blue-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type anything to search..."
          autoFocus={true}
        />
        <button
          aria-label="search button"
          className="absolute top-1/2 left-2 -translate-y-1/2 outline-0"
        >
          <ICONS_MAP.search className="h-6 w-6 text-gray-800" />
        </button>
      </div>
      <ul className="flex w-full flex-col gap-6">
        {isPending ? (
          <li className="flex w-full flex-col gap-6">
            <SkeletonLoader
              repeatNumber={10}
              width="w-full"
              hight="h-26 lg:h-32 xl:h-40"
              rounded="rounded-lg"
            />
          </li>
        ) : (
          <SearchItems
            searchResults={searchProducts}
            searchQuery={searchQuery}
          />
        )}
      </ul>
    </div>
  );
}

function SearchItems({ searchResults, searchQuery }: SearchItemsProps) {
  return searchResults?.length > 0 ? (
    searchResults.map((item) => (
      <ProductSearchItem
        product={item}
        searchQuery={searchQuery}
        key={item.id}
      />
    ))
  ) : (
    <h3 className="mx-auto mt-20 text-4xl font-bold tracking-wide text-blue-950">
      No items to display
    </h3>
  );
}

export default SearchPanel;
