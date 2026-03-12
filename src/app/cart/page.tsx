import PageHeader from "@/shared/components/layouts/PageHeader";
import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import CartContent from "@/features/cart/components/CartContent";
import { Suspense } from "react";

export const metadata = {
  title: "Cart",
};

async function CartPage() {
  return (
    <>
      <PageHeader heading="Cart" />
      <Suspense
        fallback={
          <SkeletonLoader
            rounded="rounded-lg"
            width="w-full"
            hight="h-[750px]"
          />
        }
      >
        <CartContent />
      </Suspense>
    </>
  );
}

export default CartPage;
