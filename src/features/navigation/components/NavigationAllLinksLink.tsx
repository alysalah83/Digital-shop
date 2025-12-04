"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_LINKS } from "../consts/navigation.consts";
import { LinkItem } from "../types/navigation.types";
import { ICONS_MAP } from "@/consts/iconsMap";

interface WindowLinkProps {
  link: LinkItem;
  onClick: () => void;
}

function NavigationAllLinksLink() {
  const allLinks = ALL_LINKS;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((cur) => !cur);
  const handelOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <li
      className={`relative cursor-pointer transition duration-300 ${
        isMenuOpen ? "text-blue-800" : ""
      } hover:text-blue-800`}
      onPointerEnter={handelOpenMenu}
      onPointerLeave={handleCloseMenu}
    >
      <div className="flex items-center gap-1" onClick={handleToggleMenu}>
        <span>Pages</span>
        <span>
          {isMenuOpen ? (
            <ICONS_MAP.arrowTop className="h-4 w-4" />
          ) : (
            <ICONS_MAP.arrowBot className="h-4 w-4" />
          )}
        </span>
      </div>
      <div
        className={`absolute left-0 z-50 min-w-40 -translate-x-1/4 translate-y-full rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-300 ${
          isMenuOpen
            ? "bottom-0 opacity-100"
            : "pointer-events-none -bottom-3 opacity-0"
        }`}
      >
        <menu className="flex flex-col font-medium">
          {allLinks.map((link) => (
            <WindowLink
              link={link}
              onClick={handleCloseMenu}
              key={`windowLink-${link.href}`}
            />
          ))}
        </menu>
      </div>
    </li>
  );
}

function WindowLink({ link, onClick }: WindowLinkProps) {
  const { label, href } = link;

  return (
    <Link href={href} onClick={onClick}>
      <li className="px-8 py-2 text-sm font-medium text-gray-500 transition duration-300 hover:bg-gray-200/40 hover:text-blue-600">
        {label}
      </li>
    </Link>
  );
}

export default NavigationAllLinksLink;
