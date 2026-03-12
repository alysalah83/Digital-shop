import Image from "next/image";
import Link from "next/link";
import dummyImgProfile from "@/../public/dummy-profile.png";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { auth } from "@/auth";

async function AuthButton() {
  const session = await auth();

  const isAuth = !!session?.user?.email;

  return isAuth ? (
    <Link href="/account">
      <div className="flex cursor-pointer items-center gap-2 text-gray-400">
        <Image
          src={session.user?.image || dummyImgProfile}
          width={30}
          height={30}
          alt={`${session.user?.name || "user"} avatar`}
          className="rounded-full"
        />
        <span className="font-medium">{session.user?.name || "user"}</span>
      </div>
    </Link>
  ) : (
    <Link href="/login">
      <button type="button" className="flex cursor-pointer items-center gap-2">
        <ICONS_MAP.person className="h-7 w-7 fill-blue-700" />
        <div className="flex flex-col justify-between">
          <h4 className="text-xs tracking-wider text-gray-400 uppercase">
            account
          </h4>
          <p className="text-start font-semibold capitalize">sign in</p>
        </div>
      </button>
    </Link>
  );
}

export default AuthButton;
