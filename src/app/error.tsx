"use client";

import Link from "next/link";
import PageHeader from "@/shared/components/layouts/PageHeader";
import { ICONS_MAP } from "@/shared/icons/iconsMap";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function Error({ error, reset }: ErrorProps) {
  const ErrorIcon = ICONS_MAP.error;
  const RetryIcon = ICONS_MAP.loop;
  const BackIcon = ICONS_MAP.arrowLeft;

  return (
    <>
      <PageHeader heading="Something Went Wrong" />
      <div className="bg-gray-100 px-8 py-16">
        <div className="mx-auto flex w-fit max-w-7xl flex-col items-center justify-center gap-8 rounded-xl bg-white p-12 px-8 shadow-sm lg:px-24">
          <div className="rounded-full bg-gray-100 p-6">
            <ErrorIcon className="h-12 w-12 text-blue-600" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-center text-2xl font-semibold tracking-wide text-blue-950 capitalize">
              an error has occurred:
            </h2>
            <p className="text-center text-lg text-gray-500">{error.message}</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="flex cursor-pointer items-center gap-3 rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
            >
              <span>
                <RetryIcon className="h-4 w-4" />
              </span>
              <span className="capitalize">try again</span>
            </button>
            <Link href="/">
              <button className="flex cursor-pointer items-center gap-3 rounded-xl border border-blue-600 px-6 py-3 text-lg font-semibold text-blue-600 transition duration-300 hover:bg-blue-50">
                <span>
                  <BackIcon className="h-4 w-4" />
                </span>
                <span className="capitalize">back to home</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
