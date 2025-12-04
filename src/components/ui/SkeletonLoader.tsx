interface SkeletonLoader {
  hight?: `h-${number | string}`;
  width?: `w-${number | string}`;
  bgColor?: `bg-${string}-${number}`;
  rounded?: `rounded-${string}`;
  flashColor?: `via-${string}-${number}`;
  repeatNumber?: number;
  extraClasses?: string;
}

function SkeletonLoader({
  hight = "h-full",
  width = "w-full",
  bgColor = "bg-gray-300",
  rounded = "rounded-lg",
  flashColor = "via-gray-200",
  repeatNumber = 1,
  extraClasses,
}: SkeletonLoader) {
  return (
    <>
      {Array.from({ length: repeatNumber }).map((_, index) => (
        <div
          className={`${hight} ${width} ${bgColor} ${rounded} ${extraClasses} overflow-hidden`}
          key={index}
        >
          <div
            className={`h-full animate bg-gradient-to-r from-transparent to-transparent ${flashColor} animate-skeleton`}
          />
        </div>
      ))}
    </>
  );
}
export default SkeletonLoader;
