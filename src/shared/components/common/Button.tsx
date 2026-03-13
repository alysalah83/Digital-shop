import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "red";
  size?: "large" | "medium" | "small";
  buttonType?: HTMLButtonElement["type"];
  scratch?: boolean;
  scratchOnBigScreen?: boolean;
  bgColor?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  type = "primary",
  size = "medium",
  scratch = false,
  scratchOnBigScreen = false,
  bgColor = "",
  buttonType = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const buttonClasses = clsx(
    "font-semibold tracking-wide capitalize text-nowrap cursor-pointer",
    "transition duration-300 disabled:cursor-not-allowed",
    {
      "text-slate-100 disabled:bg-blue-900": type === "primary",
      "text-slate-800 border border-gray-200 hover:text-blue-50 active:text-blue-50":
        type === "secondary",
      "text-red-500 hover:text-red-700 active:text-red-700 disabled:opacity-40":
        type === "red",
    },
    {
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-700":
        type === "primary" && !bgColor,
      "bg-gray-100 hover:bg-blue-950 active:bg-blue-950":
        type === "secondary" && !bgColor,
      [bgColor]: !!bgColor,
    },
    {
      "px-7 py-2.5 text-base rounded-lg font-bold": size === "large",
      "px-6 py-2 text-sm rounded-md": size === "medium",
      "px-4 py-2 text-sm rounded-md": size === "small",
    },
    scratch ? "w-full" : "w-fit",
    scratchOnBigScreen ? "lg:w-full" : "",
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={buttonType}
    >
      {children}
    </button>
  );
}

export default Button;
