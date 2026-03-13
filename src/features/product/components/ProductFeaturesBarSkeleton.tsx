import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";

function ProductFeaturesBarSkeleton() {
  return (
    <menu className="absolute top-2 right-2 z-10 flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index}>
          <SkeletonLoader rounded="rounded-full" width="w-9.5" hight="h-9.5" />
        </li>
      ))}
    </menu>
  );
}

export default ProductFeaturesBarSkeleton;
