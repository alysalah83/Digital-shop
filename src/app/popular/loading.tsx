import PageHeader from "@/shared/components/layouts/PageHeader";
import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { PAGINATION_ITEMS_PER_PAGE } from "@/app/shop/(shop)/_components/shop.consts";

function loading() {
  return (
    <div className="bg-slate-200">
      <PageHeader heading="Explore All Products" />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-y-6 px-6 py-10 sm:grid-cols-2 sm:gap-8 lg:mb-20 lg:grid-cols-3 xl:grid-cols-4">
        <SkeletonLoader
          hight="h-16"
          extraClasses="sm:col-span-2 lg:col-span-3 xl:col-span-4"
        />
        <SkeletonLoader hight="h-82" repeatNumber={PAGINATION_ITEMS_PER_PAGE} />
        <SkeletonLoader
          hight="h-14"
          extraClasses="col-start-2 row-start-6 justify-self-center col-end-4 mt-16"
        />
      </div>
    </div>
  );
}

export default loading;
