import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { IconsMap } from "@/shared/types";
import clsx from "clsx";
import { useMemo } from "react";

interface ButtonIconProps {
  icon: IconsMap;
  btnType?: "default" | "delete";
  ariaLabel: string;
  isActive?: boolean;
  rounded?: `rounded-${string}`;
  disabled?: boolean;
  isPending?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

function ButtonIcon({
  icon,
  btnType = "default",
  isActive = false,
  ariaLabel,
  rounded = "rounded-md",
  size = "medium",
  disabled = false,
  isPending = false,
  onClick,
}: ButtonIconProps) {
  const Icon = useMemo(() => ICONS_MAP[icon], [icon]);

  const buttonClasses = clsx(
    "flex group/buttonIcon items-center justify-center border border-gray-300 transition duration-300 ",
    rounded,
    {
      "hover:bg-blue-400 active:bg-blue-400":
        btnType === "default" && !disabled && !isPending && !isActive,
      "hover:bg-red-600/20 hover:border-red-600 active:bg-red-600/20 active:border-red-600":
        btnType === "delete",
    },
    {
      "bg-blue-600": isActive && btnType === "default" && !isPending,
      "bg-gray-100 ": !isActive && btnType === "default" && !isPending,
      "bg-white": !isActive && btnType === "default" && isPending,
    },
    {
      "cursor-not-allowed": disabled && isPending,
      "opacity-40 cursor-not-allowed": disabled && !isPending,
      "cursor-pointer": !disabled,
    },
    {
      "p-3": size === "large",
      "p-2": size === "medium",
      "p-1": size === "small",
    },
  );

  const iconClasses = clsx(
    "transition duration-300 ",
    {
      "group-hover/buttonIcon:text-white group-active/buttonIcon:text-white":
        btnType === "default",
      "group-hover/buttonIcon:text-red-600 group-active/buttonIcon:text-red-600":
        btnType === "delete",
    },
    {
      "text-white": isActive,
      "text-gray-600": !isActive,
    },
    {
      "size-6": size === "large",
      "size-5": size === "medium",
      "size-4": size === "small",
    },
  );

  const pendingIconContainerClasses = clsx("flex items-center justify-center", {
    "size-6": size === "large",
    "size-5": size === "medium",
    "size-4": size === "small",
  });

  const pendingIconClasses = clsx(
    "bg-blue-600 animate-ping rounded-full w-1/2 h-1/2",
  );

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {isPending ? (
        <div className={pendingIconContainerClasses}>
          <div className={pendingIconClasses} />
        </div>
      ) : (
        <Icon className={iconClasses} />
      )}
    </button>
  );
}

export default ButtonIcon;
