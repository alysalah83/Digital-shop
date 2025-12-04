import PageHeader from "@/components/layouts/PageHeader";
import AccountSideNav from "@/features/account/components/AccountSideNav";
import { Suspense } from "react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PageHeader heading="Account" />
      <div className="flex w-full">
        <AccountSideNav />
        {children}
      </div>
    </>
  );
}

export default layout;
