"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useActionState, useState } from "react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { RiMenuUnfold3Line, RiMenuUnfold4Line } from "react-icons/ri";
import { ACCOUNT_NAV_ITEMS } from "../consts/account.consts";
import { signoutAction } from "../actions/account.actions";
import Button from "@/components/common/Button";
import { ICONS_MAP } from "@/consts/iconsMap";

function AccountSideNav() {
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);

  const handleToggleSideBar = () => setIsSideBarOpened((cur) => !cur);
  const sideBarIconClasses = "h-6 w-6 text-blue-600";

  return (
    <div className="relative">
      <nav
        className={`fixed top-0 left-0 z-40 h-screen min-w-72 bg-white pt-10 shadow-2xl transition duration-300 ease-out sm:min-w-80 lg:static lg:h-full lg:min-w-72 lg:translate-x-0 lg:border-y-4 lg:border-gray-100 lg:shadow-none ${isSideBarOpened ? "translate-x-0" : "-translate-x-full"}`}
      >
        <menu className="flex h-full flex-col gap-5">
          {ACCOUNT_NAV_ITEMS.map((item) => (
            <NavList item={item} key={item.href} />
          ))}
          <li className="mt-auto px-8">
            <Suspense>
              <SignOutButton />
            </Suspense>
          </li>
        </menu>
        <button
          onClick={handleToggleSideBar}
          className="absolute top-1/2 -right-12 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-blue-100 p-2 shadow-2xl lg:hidden"
          aria-label={
            isSideBarOpened ? "close sidebar menu" : "open sidebar menu"
          }
        >
          {isSideBarOpened ? (
            <ICONS_MAP.menu className={sideBarIconClasses} />
          ) : (
            <ICONS_MAP.menu2 className={sideBarIconClasses} />
          )}
        </button>
      </nav>
      {isSideBarOpened && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={handleToggleSideBar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function NavList({ item }: { item: { label: string; href: string } }) {
  const pathname = usePathname();
  const { label, href } = item;

  const isActive = pathname === href;

  return (
    <Link href={href}>
      <li
        className={`px-16 py-4 font-medium tracking-wide text-nowrap transition duration-300 ${isActive ? "bg-gray-100 text-blue-600" : "bg-white text-gray-600"} hover:bg-gray-100 hover:text-blue-600`}
      >
        {label}
      </li>
    </Link>
  );
}

function SignOutButton() {
  const [prevState, action, isPending] = useActionState(signoutAction, null);

  return (
    <form action={action}>
      <Button type="red" disabled={isPending} buttonType="submit">
        <div className="flex items-center gap-2">
          <ICONS_MAP.signOut className="h-5 w-5" />
          <span>Sign out</span>
        </div>
      </Button>
    </form>
  );
}

export default AccountSideNav;
