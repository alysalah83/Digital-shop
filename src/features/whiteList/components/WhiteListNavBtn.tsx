import { ICONS_MAP } from "@/shared/icons/iconsMap";
import Link from "next/link";

function WhitelistNavBtn() {
  return (
    <>
      <Link
        href="/whitelist"
        className="flex cursor-pointer items-center gap-2"
      >
        <ICONS_MAP.filledHeart className="h-6 w-6 fill-red-500 sm:h-7 sm:w-7" />
        <h4 className="text-xs font-medium tracking-wide text-gray-400 uppercase sm:tracking-wider">
          WhiteList
        </h4>
      </Link>
    </>
  );
}

export default WhitelistNavBtn;
