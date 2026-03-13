import WhiteListTable from "@/app/whitelist/_components/WhiteListTable";
import { User } from "@/generated/prisma/client";
import EmptyPage from "@/shared/components/common/EmptyPage";
import PageHeader from "@/shared/components/layouts/PageHeader";
import { cacheLife, cacheTag } from "next/cache";
import { getWhitelistProducts } from "../../../features/whiteList/queries/whitelist.queries";

async function WhitelistPage({
  userId,
  guestId,
}: {
  userId: User["id"] | undefined;
  guestId: string | undefined;
}) {
  "use cache";
  cacheLife("max");
  if (userId) cacheTag(`whitelist-${userId}`);
  if (guestId) cacheTag(`whitelist-${guestId}`);

  const whitelistProducts = await getWhitelistProducts({ userId, guestId });
  const whiteListProductsCount = whitelistProducts.length;
  return (
    <>
      <PageHeader heading="WhiteList" />
      <main
        className={`${whiteListProductsCount > 0 ? "bg-gray-300" : "bg-white"}`}
      >
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          {whiteListProductsCount > 0 ? (
            <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
              <WhiteListTable whitelistProducts={whitelistProducts} />
            </div>
          ) : (
            <div className="flex w-full justify-center">
              <EmptyPage label="your whiteList is empty!" icon="heart" />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default WhitelistPage;
