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
import NavigationMobileMenu from "./NavigationMobileMenu";

function Navigation() {
  return (
    <NavigationWrapper>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 lg:flex-nowrap">
        <div className="shrink-0">
          <Logo />
        </div>

        <div className="flex-1 sm:min-w-54">
          <SearchInputLink />
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-5">
          <Suspense fallback={<AuthButtonSkeleton />}>
            <AuthButton />
          </Suspense>
          <Suspense fallback={<CartNavBtnSkeleton />}>
            <CartNavBtn />
          </Suspense>
          <WhitelistNavBtn />
          <NavigationMobileMenu />
        </div>
      </div>

      <div className="mt-3 hidden border-t border-gray-100 pt-3 lg:block">
        <NavigationLinks />
      </div>
    </NavigationWrapper>
  );
}

export default Navigation;
