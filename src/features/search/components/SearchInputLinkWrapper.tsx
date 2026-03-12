"use client";

import { useState } from "react";
import SearchPanel from "./SearchPanel";
import QueryProvider from "@/shared/providers/QueryProvider";
import { ProductSummary } from "@/features/product/types/product.type";

function SearchInputLinkWrapper({
  children,
  initSearchResults,
}: Readonly<{ children: React.ReactNode }> & {
  initSearchResults: ProductSummary[];
}) {
  const [isSearchPanelOpened, setIsSearchPanelOpened] = useState(false);

  return (
    <>
      <div onClick={() => setIsSearchPanelOpened(true)}>{children}</div>
      {isSearchPanelOpened && (
        <>
          <div
            className={`fixed inset-0 z-30 cursor-pointer bg-black/20`}
            onClick={() => setIsSearchPanelOpened(false)}
            aria-hidden="true"
          />
          <QueryProvider>
            <SearchPanel initSearchResults={initSearchResults} />
          </QueryProvider>
        </>
      )}
    </>
  );
}

export default SearchInputLinkWrapper;
