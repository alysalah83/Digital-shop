"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useCategoryFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const categorySet = useMemo(() => {
    const categoryParam = searchParams.get("category");
    return new Set(
      categoryParam ? categoryParam.split(",").filter(Boolean) : []
    );
  }, [searchParams]);

  const handleCategoryFilter = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentCategories = params.get("category");

      // Parse current categories into a Set for easier manipulation
      const categoriesSet = new Set(
        currentCategories ? currentCategories.split(",").filter(Boolean) : []
      );

      if (categoriesSet.has(category)) {
        categoriesSet.delete(category);

        if (categoriesSet.size === 0) {
          params.delete("category");
        } else {
          params.set("category", Array.from(categoriesSet).join(","));
        }
      } else {
        // Add the category
        categoriesSet.add(category);
        params.set("category", Array.from(categoriesSet).join(","));
      }
      params.delete("page");
      const newUrl = `${pathname}?${params.toString()}`;
      push(newUrl, { scroll: false });
    },
    [pathname, searchParams, push]
  );

  return { handleCategoryFilter, categorySet };
}
