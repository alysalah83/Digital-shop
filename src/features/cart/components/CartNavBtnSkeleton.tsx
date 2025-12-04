import SkeletonLoader from "@/components/ui/SkeletonLoader";

function CartNavBtnSkeleton() {
  return (
    <div className="flex gap-2">
      <SkeletonLoader width="w-8" hight="h-8" rounded="rounded-lg" />
      <SkeletonLoader
        width="w-12"
        hight="h-3"
        rounded="rounded-sm"
        extraClasses="self-end"
      />
    </div>
  );
}

export default CartNavBtnSkeleton;
