"use client";

import { SELECT_FILTER_OPTIONS } from "../consts/productsFilters.consts";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SelectFilterValue } from "../types/productFilters.types";

function ProductsSortBy() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleSortByChange = (newFilter: SelectFilterValue | "none") => {
    const params = new URLSearchParams(searchParams);
    if (newFilter === "none") params.delete("sortBy");
    else {
      if (newFilter === params.get("sortBy")) return;
      else params.set("sortBy", newFilter);
    }
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      title="price direction selector"
      defaultValue={searchParams.get("sortBy") || "none"}
      onChange={(e) =>
        handleSortByChange(e.target.value as SelectFilterValue | "none")
      }
      className="rounded-md border border-gray-300 px-2.5 py-1.5 focus:border-blue-500 focus:outline-none"
    >
      <option value={"none"}>Select Order</option>
      {SELECT_FILTER_OPTIONS.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default ProductsSortBy;
