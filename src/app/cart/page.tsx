import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import CartPage from "./_components/CartPage";

export const metadata = {
  title: "Cart",
};

async function page() {
  const session = await auth();
  const userId = session?.user?.id;
  let guestId: string | undefined;
  if (!userId) guestId = (await cookies()).get("guestId")?.value;

  return <CartPage userId={userId} guestId={guestId} />;
}

export default page;
