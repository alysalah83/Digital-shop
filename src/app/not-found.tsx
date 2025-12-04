"use client";

import PageHeader from "@/components/layouts/PageHeader";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

function NotFound() {
  return (
    <>
      <PageHeader heading="Not Found" />
      <div className="bg-gray-100 px-8 py-16">
        <div className="mx-auto flex w-fit max-w-7xl flex-col items-center justify-center gap-8 rounded-xl bg-white p-12 px-8 shadow-sm lg:px-24">
          <h2 className="text-9xl font-bold tracking-wide text-blue-600">
            404
          </h2>
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-center text-2xl font-semibold tracking-wide text-blue-950 capitalize">
              sorry the page can&apos;t be found
            </h3>
            <p className="text-center text-lg text-gray-500">
              The page you were looking for appears to have been moved, deleted
              or does not exist.
            </p>
          </div>
          <Link href="/">
            <button className="flex cursor-pointer items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700">
              <span>
                <FaArrowLeftLong className="h-4 w-4" />
              </span>
              <span className="capitalize">back to home</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
