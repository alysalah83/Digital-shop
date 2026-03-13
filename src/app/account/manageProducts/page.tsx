import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import AccountProducts from "@/features/account/components/AccountProducts";
import { Suspense } from "react";

export const metadata = {
  title: "Account | Manage product",
};

function page() {
  return (
    <div className="w-full bg-gray-100 p-10">
      <h1 className="text-3xl font-bold tracking-wide">
        Edit or Delete your products
      </h1>
      <Suspense
        fallback={
          <SkeletonLoader
            rounded="rounded-xl"
            width="w-full"
            hight="h-[700px]"
          />
        }
      >
        <AccountProducts />
      </Suspense>
    </div>
  );
}

export default page;
