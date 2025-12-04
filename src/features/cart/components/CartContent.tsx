import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import CartTable from "./CartTable";
import CartSubtotal from "./CartSubtotal";
import EmptyPage from "@/components/common/EmptyPage";

async function CartContent() {
  const session = await auth();
  const userId = session?.user?.id;

  let cartItems;
  if (userId)
    cartItems = await prisma.cartItem.findMany({
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
    cartItems = await prisma.cartItem.findMany({
      where: {
        guestId,
      },
      include: { product: true },
    });
  }

  console.log(cartItems);

  const cartItemsCount = cartItems.length;
  return (
    <main className={`${cartItemsCount > 0 ? "bg-gray-300" : "bg-white"}`}>
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {cartItemsCount > 0 ? (
          <>
            <div className="overflow-x-auto rounded-lg bg-white px-8 py-5 shadow-md">
              <CartTable cartItems={cartItems} />
            </div>
            <CartSubtotal items={cartItems} />
          </>
        ) : (
          <div className="flex w-full justify-center">
            <EmptyPage label="your cart is empty!" icon="cart" />
          </div>
        )}
      </section>
    </main>
  );
}

export default CartContent;
