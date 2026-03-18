import EmptyPage from "@/shared/components/common/EmptyPage";
import PageHeader from "@/shared/components/layouts/PageHeader";
import { User } from "@/generated/prisma/client";
import { getCartItemsProducts } from "@/features/cart/queries/cart.queries";
import { cacheLife, cacheTag } from "next/cache";
import CartTable from "./CartTable";
import CartSubtotal from "@/app/cart/_components/CartSubtotal";

async function CartPage({
  userId,
  guestId,
}: {
  userId: User["id"] | undefined;
  guestId: string | undefined;
}) {
  "use cache";
  cacheLife("max");
  if (userId) cacheTag(`cart-${userId}`);
  if (guestId) cacheTag(`cart-${guestId}`);
  const cartProducts = await getCartItemsProducts({ userId, guestId });

  const cartItemsCount = cartProducts.length;
  return (
    <>
      <PageHeader heading="Cart" />
      <main className={`${cartItemsCount > 0 ? "bg-gray-300" : "bg-white"}`}>
        <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          {cartItemsCount > 0 ? (
            <>
              <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
                <CartTable cartProducts={cartProducts} />
              </div>
              <CartSubtotal cartProducts={cartProducts} />
            </>
          ) : (
            <div className="flex w-full justify-center py-6">
              <EmptyPage label="your cart is empty!" icon="cart" />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default CartPage;
