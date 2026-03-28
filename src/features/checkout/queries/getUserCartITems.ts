import { getCartItemsProducts } from "@/features/cart/queries/cart.queries";
import { auth } from "@/lib/auth";

export async function getUserCartItems() {
  const session = await auth();
  const userId = session?.user?.id;
  return await getCartItemsProducts({ userId });
}
