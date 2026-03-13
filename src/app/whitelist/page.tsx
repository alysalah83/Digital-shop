import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import WhitelistPage from "./_components/WhitelistPage";

export const metadata = {
  title: "Whitelist",
};

async function page() {
  const session = await auth();
  const userId = session?.user?.id;
  let guestId: string | undefined;
  if (guestId) guestId = (await cookies()).get("guestId")?.value;

  return <WhitelistPage userId={userId} guestId={guestId} />;
}

export default page;
