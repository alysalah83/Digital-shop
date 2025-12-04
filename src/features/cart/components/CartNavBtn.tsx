import { auth } from "@/auth";
import { ICONS_MAP } from "@/consts/iconsMap";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import CartSideMenuBtn from "./CartSideMenuBtn";
import { cacheTag } from "next/cache";

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

  const cartProductsPromise = getCartProductsPromise(userId, guestId);

  return (
    <>
      <CartSideMenuBtn cartProductsPromise={cartProductsPromise}>
        <span className="absolute -top-2 -left-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-blue-50">
          {cartItemsCount}
        </span>
        <ICONS_MAP.cart className="h-6 w-6 fill-blue-700" />
        <div className="flex flex-col items-center justify-between">
          <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            cart
          </h4>
          <p className="text-sm font-semibold capitalize">
            ${cartItemsTotalPrice}
          </p>
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
  console.log("start");
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
