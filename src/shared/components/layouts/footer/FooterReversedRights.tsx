"use client";

import SkeletonLoader from "@/shared/components/ui/SkeletonLoader";
import { Suspense } from "react";

function CurrentYear() {
  const curYear = new Date().getFullYear();

  return <span>{curYear}</span>;
}

function FooterReversedRights() {
  return (
    <small className="text-bold mt-8 block bg-gray-100 px-5 py-4 text-xs text-gray-500 sm:text-center">
      ©
      <Suspense fallback={<SkeletonLoader width="w-6" hight="h-4" />}>
        <CurrentYear />
      </Suspense>
      <span>. All rights reserved by Aly Salah.</span>
    </small>
  );
}

export default FooterReversedRights;
