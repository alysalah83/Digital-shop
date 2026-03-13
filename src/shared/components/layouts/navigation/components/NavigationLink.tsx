"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkItem } from "../types/navigation.types";

function NavigationLink({ linkItem }: { linkItem: LinkItem }) {
  const { href, label } = linkItem;
  const pathname = usePathname();
  const active = href === pathname;
  return (
    <li className="group">
      <Link
        href={href}
        className={`transition duration-300 group-hover:text-blue-800 ${
          active ? "text-blue-800" : "text-blue-950"
        }`}
      >
        {label}
      </Link>
      <span
        className={`block h-0.5 bg-blue-800 transition-all duration-300 group-hover:w-full ${
          active ? "w-full" : "w-0"
        }`}
      />
    </li>
  );
}

export default NavigationLink;
