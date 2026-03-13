"use client";

import { usePathname } from "next/navigation";

function PageHeader({ heading }: { heading: string }) {
  const pathname = usePathname();

  const stringPath = pathname.split("/").with(0, "home");
  const pathArr: string[] = [];

  stringPath.forEach((path) => {
    pathArr.push(`${path[0]?.toUpperCase()}${path.slice(1)}`);
  });

  return (
    <header className="col-span-2 border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-10 md:py-10">
        <h1 className="text-xl font-bold tracking-wide capitalize lg:text-3xl">
          {heading}
        </h1>
        <span className="text-end text-sm font-medium tracking-wide text-gray-500 lg:text-base lg:font-semibold">
          {pathArr.slice(0, -1).join(" / ")} {""} / {""}
          <span className="text-blue-600 capitalize">{pathArr.at(-1)}</span>
        </span>
      </div>
    </header>
  );
}

export default PageHeader;
