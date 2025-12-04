import AccountSettingFormSkeleton from "@/features/account/components/AccountSettingFormSkeleton";
import AccountSettingPanel from "@/features/account/components/AccountSettingPanel";
import { Suspense } from "react";

export const metadata = {
  title: "Account | Setting",
};

async function page() {
  return (
    <main className="w-full bg-gray-100 px-6 py-24 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center">
        <div className="min-w-3/4 rounded-xl bg-white p-10 shadow-md xl:min-w-2xl">
          <h1 className="border-b border-gray-200 pb-8 text-2xl font-bold tracking-wide text-gray-600">
            Update Your User Setting
          </h1>
          <Suspense fallback={<AccountSettingFormSkeleton />}>
            <AccountSettingPanel />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default page;
