import { memo } from "react";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { CategoryWithProductsCount } from "./filters.types";

interface SideBarCategoryItemProps {
  category: CategoryWithProductsCount;
  isChecked: boolean;
  onCheckChange: (categoryName: string) => void;
}

function SideBarCategoryItem({
  category,
  isChecked,
  onCheckChange,
}: SideBarCategoryItemProps) {
  const { name, productsCount, id } = category;

  return (
    <li className="group flex items-center justify-between gap-12">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center">
          <input
            id={String(id)}
            type="checkbox"
            checked={isChecked}
            onChange={() => onCheckChange(name)}
            className="sr-only"
            aria-label={`category ${name}`}
          />
          <div
            onClick={() => onCheckChange(name)}
            className={`flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded border transition-colors ${isChecked ? "border-blue-600 bg-blue-600" : "border-gray-500 bg-white"}`}
          >
            <ICONS_MAP.checkMark
              className={`h-3 w-3 text-white ${isChecked ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>

        <label
          htmlFor={String(id)}
          className={`cursor-pointer font-medium capitalize transition-colors group-hover:text-blue-600 ${isChecked ? "text-blue-600" : "text-gray-500"}`}
        >
          {name.replace("-", " ")}
        </label>
      </div>
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full p-0.5 text-center text-xs font-bold transition-colors group-hover:bg-blue-600 group-hover:text-white ${isChecked ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
      >
        {productsCount}
      </span>
    </li>
  );
}

export default memo(SideBarCategoryItem);
