import CheckoutBtn from "@/features/checkout/components/CheckoutBtn";
import CheckoutProducts from "@/features/checkout/components/CheckoutProducts";
import CheckoutOrderSummary from "@/features/checkout/components/CheckoutSubTotal";
import CheckoutTotal from "@/features/checkout/components/CheckoutTotal";
import { getUserCartItems } from "@/features/checkout/queries/getUserCartITems";
import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { Suspense } from "react";

function page() {
  const cartProductsPromise = getUserCartItems();
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="relative mx-auto grid min-h-[75vh] w-full max-w-7xl overflow-hidden rounded-xl shadow-sm md:grid-cols-2">
        <div className="flex flex-col gap-10 bg-blue-900 p-8 text-white">
          <h2 className="text-base font-medium tracking-widest text-blue-300 uppercase">
            Cart Items
          </h2>
          <div className="flex flex-col gap-3 overflow-y-auto">
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 border-b border-white/10 pb-3 text-xs font-medium tracking-wide text-blue-300">
              <span>Name</span>
              <span>Qty</span>
              <span>Price</span>
            </div>
            <div className="flex flex-col gap-4">
              <Suspense
                fallback={
                  <SkeletonLoader
                    width="w-full"
                    hight="h-6"
                    rounded="rounded-sm"
                    repeatNumber={6}
                  />
                }
              >
                <CheckoutProducts cartProductsPromise={cartProductsPromise} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-white p-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-medium tracking-widest text-gray-400 uppercase">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <Suspense
                  fallback={
                    <SkeletonLoader
                      width="w-10"
                      hight="h-5"
                      rounded="rounded-md"
                    />
                  }
                >
                  <CheckoutOrderSummary
                    cartProductsPromise={cartProductsPromise}
                  />
                </Suspense>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-100 pt-4">
              <span className="font-semibold text-gray-900">Total</span>
              <Suspense
                fallback={
                  <SkeletonLoader
                    width="w-10"
                    hight="h-5"
                    rounded="rounded-md"
                  />
                }
              >
                <CheckoutTotal cartProductsPromise={cartProductsPromise} />
              </Suspense>
            </div>
          </div>
          <CheckoutBtn />
        </div>
      </div>
    </div>
  );
}

export default page;
