import { ICONS_MAP } from "@/shared/icons/iconsMap";
import SearchInputLinkWrapper from "./SearchInputLinkWrapper";
import { cacheLife } from "next/cache";
import { getProducts } from "@/features/product/queries/products.queries";

async function SearchInputLink() {
  "use cache";
  cacheLife("days");

  const initSearchResults = await getProducts({
    orderBy: { createdAt: "asc" },
    take: 10,
  });

  return (
    <SearchInputLinkWrapper initSearchResults={initSearchResults}>
      <div className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-500 px-4 py-2 ring-slate-400 transition duration-200 hover:ring active:ring md:gap-6 lg:gap-10">
        <span className="text-sm font-medium overflow-ellipsis whitespace-nowrap text-gray-700/50">
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
