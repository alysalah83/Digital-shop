import { auth } from "@/auth";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import CartSideMenuBtn from "./CartSideMenuBtn";
import { cacheTag } from "next/cache";
import CartNavBtnItemsCount from "./CartNavBtnItemsCount";
import CartNavBtnPriceSubtotal from "./CartNavBtnPriceSubtotal";

async function CartNavBtn() {
  const session = await auth();
  const userId = session?.user?.id;
  let guestId: string | undefined;
  if (!userId) guestId = (await cookies()).get("guestId")?.value;

  const cartItems = await getCartItems(userId, guestId);

  const cartItemsCount = cartItems.length;
  const cartItemsTotalPrice = Number(
    cartItems.reduce((sum, item) => sum + item.product.price, 0).toFixed(2),
  );

  const cartProducts = await getCartProductsPromise(userId, guestId);

  return (
    <>
      <CartSideMenuBtn cartProducts={cartProducts}>
        <CartNavBtnItemsCount CartNavBtnItemsCount={cartItemsCount} />
        <ICONS_MAP.cart className="h-6 w-6 fill-blue-700" />
        <div className="flex flex-col items-center justify-between">
          <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            cart
          </h4>
          <CartNavBtnPriceSubtotal
            initialCartItemsPriceSubtotal={cartItemsTotalPrice}
          />
        </div>
      </CartSideMenuBtn>
    </>
  );
}

async function getCartProductsPromise(
  userId: string | undefined,
  guestId: string | undefined,
) {
  "use cache";
  if (!userId && !guestId) return [];

  cacheTag(`cart-${userId || guestId}`);

  return prisma.cartItem.findMany({
    where: userId ? { userId } : { guestId },
    include: {
      product: {
        select: {
          id: true,
          image: true,
          name: true,
          price: true,
        },
      },
    },
  });
}

async function getCartItems(
  userId: string | undefined,
  guestId: string | undefined,
) {
  "use cache";
  if (!userId && !guestId) return [];

  cacheTag(`cart-${userId || guestId}`);

  const cartItems = await prisma.cartItem.findMany({
    where: userId ? { userId } : { guestId },

    include: {
      product: {
        select: { price: true },
      },
    },
  });
  return cartItems;
}

export default CartNavBtn;
