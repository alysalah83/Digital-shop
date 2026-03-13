"use client";

import { useCallback, useState } from "react";
import ToggleVisibilityRow from "./ToggleVisibilityRow";
import SideBarCategoryItem from "./SideBarCategoryItem";
import { useCategoryFilter } from "./useCategoryFilter";
import { CategoryWithProductsCount } from "./filters.types";

function SideBarCategoriesFilter({
  categories,
}: {
  categories: CategoryWithProductsCount[];
}) {
  const [isVisible, setIsVisible] = useState(true);
  const { handleCategoryFilter, categorySet } = useCategoryFilter();
  const handleToggleVisibility = useCallback(
    () => setIsVisible((cur) => !cur),
    [],
  );

  return (
    <div className="rounded-md bg-white shadow-md">
      <ToggleVisibilityRow
        label="Category"
        isVisible={isVisible}
        onToggle={handleToggleVisibility}
      />

      {isVisible && (
        <menu className="flex flex-col gap-4.5 px-6 py-6">
          {categories.map((category) => (
            <SideBarCategoryItem
              category={category}
              isChecked={categorySet.has(category.name)}
              onCheckChange={handleCategoryFilter}
              key={category.id}
            />
          ))}
        </menu>
      )}
    </div>
  );
}

export default SideBarCategoriesFilter;
