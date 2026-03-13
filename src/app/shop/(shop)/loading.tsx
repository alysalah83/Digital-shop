import PageHeader from "@/shared/components/layouts/PageHeader";
import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/shop/(shop)/_components/shop.consts";

function loading() {
  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore All Products" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 py-10 md:flex-row md:items-stretch md:px-10">
        <div className="flex h-full w-1/2 flex-col gap-8 lg:w-1/3">
          <SkeletonLoader hight="h-14" />
          <SkeletonLoader hight="h-96" />
          <SkeletonLoader hight="h-40" />
        </div>
        <div className="grid w-full grid-cols-1 items-center gap-y-6 sm:grid-cols-2 sm:gap-8 lg:mb-20 xl:grid-cols-3">
          <SkeletonLoader
            hight="h-16"
            extraClasses="sm:col-span-2 xl:col-span-3"
          />
          <SkeletonLoader
            hight="h-82"
            repeatNumber={PAGINATION_ITEMS_PER_PAGE}
          />
          <SkeletonLoader
            hight="h-14"
            extraClasses="col-start-2 col-end-3 mt-16"
          />
        </div>
      </div>
    </div>
  );
}

export default loading;
