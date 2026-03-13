import { cacheLife } from "next/cache";

async function FooterReversedRights() {
  "use cache";
  cacheLife("max");
  const curYear = new Date().getFullYear();

  return (
    <small className="text-bold mt-8 block bg-gray-100 px-5 py-4 text-xs text-gray-500 sm:text-center">
      ©<span>{curYear}</span>
      <span>. All rights reserved by Aly Salah.</span>
    </small>
  );
}

export default FooterReversedRights;
