import SkeletonLoader from "@/components/ui/SkeletonLoader";

function AccountSettingFormSkeleton() {
  return (
    <div className="flex flex-col gap-12 pt-6">
      <div className="flex flex-col gap-6">
        <SkeletonLoader width="w-full" hight="h-11" rounded="rounded-lg" />
        <SkeletonLoader width="w-full" hight="h-11" rounded="rounded-lg" />
        <SkeletonLoader width="w-full" hight="h-11" rounded="rounded-lg" />
      </div>
      <SkeletonLoader width="w-32" hight="h-9" rounded="rounded-lg" />
    </div>
  );
}

export default AccountSettingFormSkeleton;
