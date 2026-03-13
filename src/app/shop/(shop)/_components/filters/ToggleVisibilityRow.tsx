import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { memo } from "react";

interface ToggleVisibilityRowProps {
  label: string;
  isVisible: boolean;
  onToggle: () => void;
}

function ToggleVisibilityRow({
  label,
  isVisible,
  onToggle,
}: ToggleVisibilityRowProps) {
  return (
    <h3
      className={`flex items-center justify-between ${isVisible ? "border-b border-gray-300" : ""} p-5 py-3 hover:cursor-pointer`}
      onClick={onToggle}
    >
      <span className="text-lg font-semibold">{label}</span>
      <span>
        {isVisible ? (
          <ICONS_MAP.arrowBot className="h-5 w-5" />
        ) : (
          <ICONS_MAP.arrowTop className="h-5 w-5" />
        )}
      </span>
    </h3>
  );
}

export default memo(ToggleVisibilityRow);
