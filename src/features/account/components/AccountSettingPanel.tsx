import { auth } from "@/lib/auth";
import AccountSettingForm from "./AccountSettingForm";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

async function AccountSettingPanel() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return redirect("/login");

  const userData = await prisma.user.findFirst({
    where: {
      id: userId,
      email: session?.user?.email,
    },
    select: { name: true, email: true, address: true },
  });

  if (!userData || !userData?.email) return redirect("/login");
  return <AccountSettingForm userData={userData} />;
}

export default AccountSettingPanel;
