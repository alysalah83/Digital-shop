import { ICONS_MAP } from "@/shared/icons/iconsMap";
import SearchInputLinkWrapper from "./SearchInputLinkWrapper";
import prisma from "@/lib/prisma";
import { cacheLife } from "next/cache";

async function SearchInputLink() {
  "use cache";
  cacheLife("days");

  const initSearchResults = await prisma.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      price: true,
      brand: true,
      discountPercentage: true,
      image: true,
      name: true,
      rating: true,
    },
    take: 10,
  });

  return (
    <SearchInputLinkWrapper initSearchResults={initSearchResults}>
      <div className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-500 px-4 py-2 ring-slate-400 transition duration-200 hover:ring active:ring md:gap-6 lg:gap-10">
        <span className="text-sm font-medium text-gray-700/50">
          I am shopping for...
        </span>
        <span>
          <ICONS_MAP.search className="h-5 w-5 fill-slate-400 sm:h-6 sm:w-6" />
        </span>
      </div>
    </SearchInputLinkWrapper>
  );
}

export default SearchInputLink;
