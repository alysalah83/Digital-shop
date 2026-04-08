"use client";

import { useEffect, useState } from "react";
import SearchPanel from "./SearchPanel";
import QueryProvider from "@/shared/providers/QueryProvider";
import { Product } from "@/features/product/types/product.type";
import { createPortal } from "react-dom";

function SearchInputLinkWrapper({
  children,
  initSearchResults,
}: Readonly<{ children: React.ReactNode }> & {
  initSearchResults: Product[];
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchPanelOpened, setIsSearchPanelOpened] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div onClick={() => setIsSearchPanelOpened(true)}>{children}</div>
      {isSearchPanelOpened &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 z-[9999999] cursor-pointer bg-black/20`}
              onClick={() => setIsSearchPanelOpened(false)}
              aria-hidden="true"
            />
            <SearchPanel initSearchResults={initSearchResults} />
          </>,
          document.body,
        )}
    </>
  );
}

export default SearchInputLinkWrapper;
