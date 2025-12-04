"use client";

import { usePathname, useRouter } from "next/navigation";

function ClearFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClearFilters = () => replace(pathname, { scroll: false });

  return (
    <div className="flex justify-between rounded-md bg-white px-5 py-4 shadow-md">
      <span className="font-semibold text-gray-600">Filters:</span>
      <button
        onClick={handleClearFilters}
        type="reset"
        className="cursor-pointer font-semibold text-blue-600"
      >
        Clear All
      </button>
    </div>
  );
}

export default ClearFilters;
