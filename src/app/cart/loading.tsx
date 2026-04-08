import PageHeader from "@/shared/components/layouts/PageHeader";
import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { TableRowClasses } from "./_components/cart.style";

function loading() {
  return (
    <>
      <PageHeader heading="Cart" />
      <main className="bg-gray-300">
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
            <header
              className={`${TableRowClasses} pt-0 text-xl font-semibold tracking-wide text-gray-800`}
            >
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div>Delete</div>
            </header>
            {Array.from({ length: 3 }, (_, i) => i).map((item) => (
              <div
                className={`${TableRowClasses} items-center text-gray-600 last:border-0`}
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
                    width="w-3/4"
                    rounded="rounded-md"
                  />
                </div>
                <SkeletonLoader
                  hight="h-6"
                  width="w-3/4"
                  rounded="rounded-md"
                />
                <SkeletonLoader
                  hight="h-12"
                  width="w-1/2"
                  rounded="rounded-md"
                />
                <SkeletonLoader
                  hight="h-6"
                  width="w-3/4"
                  rounded="rounded-md"
                />
                <SkeletonLoader
                  hight="h-12"
                  width="w-12"
                  rounded="rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 flex w-full flex-col rounded-lg bg-white sm:w-[375px]">
            <h3 className="border-b border-gray-200 p-6 text-xl font-bold tracking-wide text-gray-800 lg:text-2xl">
              Order Summery
            </h3>
            <div className="p-6">
              <div className="flex justify-between border-b border-gray-200 pb-5 text-lg font-bold text-gray-600 lg:text-xl">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
              <ul className="flex flex-col gap-4 text-gray-500">
                {Array.from({ length: 3 }, (_, i) => i).map((item) => (
                  <SkeletonLoader
                    width="w-full"
                    hight="h-14"
                    rounded="rounded-sm"
                    key={item}
                  />
                ))}
                <li className="mb-3 flex items-center justify-between py-5 text-xl font-bold text-gray-700 lg:font-black">
                  <span>Total</span>
                  <SkeletonLoader
                    hight="h-8"
                    width="w-16"
                    rounded="rounded-md"
                  />
                </li>
              </ul>
              <SkeletonLoader width="w-1/2" hight="h-8" rounded="rounded-lg" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default loading;
