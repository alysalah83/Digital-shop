"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { NAVIGATION_LINKS, ALL_LINKS } from "../consts/navigation.consts";

function NavigationMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const drawer = (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-[9999] flex h-full w-[280px] max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-lg font-bold tracking-wide text-gray-800">
            Menu
          </span>
          <button
            onClick={close}
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close menu"
          >
            <ICONS_MAP.close className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="flex flex-col gap-1">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex items-center rounded-lg px-4 py-3 text-base font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-gray-100" />

          <p className="mb-2 px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            More Pages
          </p>
          <ul className="flex flex-col gap-0.5">
            {ALL_LINKS.filter(
              (l) => !NAVIGATION_LINKS.some((nl) => nl.href === l.href),
            ).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-center text-[10px] font-semibold tracking-[0.2em] text-gray-300 uppercase">
            ShopDigital
          </p>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-md p-1.5 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600 lg:hidden"
        aria-label="Open navigation menu"
      >
        <ICONS_MAP.menu className="h-6 w-6" />
      </button>

      {/* Portal the drawer to document.body so it's never clipped */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}

export default NavigationMobileMenu;
