import { auth } from "@/auth";
import EmptyPage from "@/components/common/EmptyPage";
import PageHeader from "@/components/layouts/PageHeader";
import WhiteListTable from "@/features/whiteList/components/WhiteListTable";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const metadata = {
  title: "Whitelist",
};

async function CartPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let whiteListItems;
  if (userId)
    whiteListItems = await prisma.whiteListItem.findMany({
      where: {
        userId,
      },
      include: { product: true },
    });
  else {
    const cookieStore = await cookies();
    let guestId = cookieStore.get("guestId")?.value;

    if (!guestId) {
      guestId = crypto.randomUUID();
      cookieStore.set("guestId", guestId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }
    whiteListItems = await prisma.whiteListItem.findMany({
      where: {
        guestId,
      },
      include: { product: true },
    });
  }

  const whiteListItemsCount = whiteListItems.length;

  return (
    <>
      <PageHeader heading="WhiteList" />
      <main
        className={`${whiteListItemsCount > 0 ? "bg-gray-300" : "bg-white"}`}
      >
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          {whiteListItemsCount > 0 ? (
            <>
              <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
                <WhiteListTable whiteListItems={whiteListItems} />
              </div>
              {/* <CartOrderSummery
              items={products}
              itemsBalance={totalPrice}
              getItemCount={getItemCount}
            /> */}
            </>
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

export default CartPage;
