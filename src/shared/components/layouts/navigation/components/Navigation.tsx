import SearchInputLink from "@/features/search/components/SearchInputLink";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import AuthButton from "@/features/auth/components/AuthButton";
import { Suspense } from "react";
import AuthButtonSkeleton from "@/features/auth/components/AuthButtonSkeleton";
import CartNavBtn from "@/features/cart/components/CartNavBtn";
import CartNavBtnSkeleton from "@/features/cart/components/CartNavBtnSkeleton";
import NavigationWrapper from "./NavigationWrapper";
import WhitelistNavBtn from "@/features/whiteList/components/WhiteListNavBtn";

function Navigation() {
  return (
    <NavigationWrapper>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-6 sm:col-span-2 lg:mb-0 lg:w-auto lg:justify-start lg:gap-12">
        <Logo />

        <SearchInputLink />
      </div>

      <div className="col-span-2 mb-2 md:mb-0 md:border-t md:border-gray-200 md:py-5 lg:col-start-1 lg:col-end-4">
        <NavigationLinks />
      </div>

      <div className="col-span-2 row-start-2 row-end-3 flex justify-center gap-4 self-center pb-0 sm:ml-4 sm:gap-7 md:gap-10 md:border-t md:border-gray-200 md:pt-5 lg:col-start-3 lg:row-start-1 lg:row-end-2 lg:items-center lg:border-0">
        <Suspense fallback={<AuthButtonSkeleton />}>
          <AuthButton />
        </Suspense>
        <Suspense fallback={<CartNavBtnSkeleton />}>
          <CartNavBtn />
        </Suspense>
        <WhitelistNavBtn />
      </div>
    </NavigationWrapper>
  );
}
export default Navigation;
