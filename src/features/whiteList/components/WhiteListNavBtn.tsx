import { ICONS_MAP } from "@/consts/iconsMap";
import Link from "next/link";

function WhitelistNavBtn() {
  return (
    <>
      <Link
        href="/whitelist"
        className="flex cursor-pointer items-center gap-2"
      >
        <ICONS_MAP.filledHeart className="h-7 w-7 fill-red-500" />
        <h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
          WhiteList
        </h4>
      </Link>
    </>
  );
}

export default WhitelistNavBtn;
