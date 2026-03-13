import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";

function AuthButtonSkeleton() {
  return (
    <div className="flex cursor-pointer items-center gap-2 text-gray-400">
      <SkeletonLoader hight="h-8" width="w-8" rounded="rounded-full" />
      <SkeletonLoader hight="h-4" width="w-16" rounded="rounded-md" />
    </div>
  );
}

export default AuthButtonSkeleton;
