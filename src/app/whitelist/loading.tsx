import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { whiteListTableRowClasses } from "./_components/whiteList.style";
import PageHeader from "@/shared/components/layouts/PageHeader";

function loading() {
  return (
    <>
      <PageHeader heading="WhiteList" />
      <main className="bg-gray-300">
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
            <header
              className={`${whiteListTableRowClasses} pt-0 text-xl font-semibold tracking-wide text-gray-800`}
            >
              <div>Product</div>
              <div>Price</div>
              <div>Stock Status</div>
              <div>Delete</div>
            </header>
            {Array.from({ length: 3 }, (_, i) => i).map((item) => (
              <div
                className={`${whiteListTableRowClasses} items-center text-gray-600 last:border-0`}
                key={item}
              >
                <div className="flex items-center gap-5">
                  <SkeletonLoader
                    hight="h-24"
                    width="w-24"
                    rounded="rounded-md"
                  />

                  <SkeletonLoader
                    hight="h-6"
                    width="w-2/3"
                    rounded="rounded-md"
                  />
                </div>
                <SkeletonLoader
                  hight="h-6"
                  width="w-2/3"
                  rounded="rounded-md"
                />
                <SkeletonLoader
                  hight="h-6"
                  width="w-2/3"
                  rounded="rounded-md"
                />
                <SkeletonLoader
                  hight="h-12"
                  width="w-12"
                  rounded="rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default loading;
