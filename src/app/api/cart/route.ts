import { getCartItemsProducts } from "@/features/cart/queries/cart.queries";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  let guestId: string | undefined;
  if (!userId) {
    const cookieStore = await cookies();
    guestId = cookieStore.get("guestId")?.value;
  }

  try {
    const cartItems = await getCartItemsProducts({ userId, guestId });
    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 },
    );
  }
}
