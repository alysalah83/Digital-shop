import { auth } from "@/lib/auth";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { cookies } from "next/headers";
import CartSideMenuBtn from "./CartSideMenuBtn";
import CartNavBtnItemsCount from "./CartNavBtnItemsCount";
import CartNavBtnPriceSubtotal from "./CartNavBtnPriceSubtotal";
import { getCartItemsProducts } from "../queries/cart.queries";
import { cacheLife, cacheTag } from "next/cache";
import { hydrate, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/providers/getQueryClient";
import { CART_QUERY_KEY } from "../hooks/useCartQuery";
import { User } from "@/generated/prisma/client";

async function CartNavBtnDataLayer() {
  const session = await auth();
  const userId = session?.user?.id;
  let guestId: string | undefined;
  if (!userId) guestId = (await cookies()).get("guestId")?.value;

  return <CartNavBtn userId={userId} guestId={guestId} />;
}

async function CartNavBtn({
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

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      return await getCartItemsProducts({ userId, guestId });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CartSideMenuBtn>
        <CartNavBtnItemsCount />
        <ICONS_MAP.cart className="h-6 w-6 fill-blue-700 sm:h-7 sm:w-7" />
        <div className="flex flex-col items-center justify-between">
          <h4 className="text-xs font-medium tracking-wide text-gray-400 uppercase sm:tracking-wider">
            cart
          </h4>
          <CartNavBtnPriceSubtotal />
        </div>
      </CartSideMenuBtn>
    </HydrationBoundary>
  );
}

export default CartNavBtnDataLayer;
