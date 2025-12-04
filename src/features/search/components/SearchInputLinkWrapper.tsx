"use client";

import { useState } from "react";
import SearchPanel from "./SearchPanel";
import { ProductSummary } from "@/shared/product/types/product.type";
import QueryProvider from "@/contexts/QueryProvider";

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
