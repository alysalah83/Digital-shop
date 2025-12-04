import prisma from "@/lib/prisma";
import SideBarCategoriesFilter from "./SideBarCategoriesFilter";
import ClearFilters from "./ClearFilters";
import PriceRanger from "./SideBarPriceRanger";

function ProductsSideBarFilters() {
  const categoriesPromise = prisma.category.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  const PriceMinMaxPromise = prisma.product.aggregate({
    _min: {
      price: true,
    },
    _max: {
      price: true,
    },
  });

  return (
    <aside className="flex flex-col gap-9 lg:min-w-2xs">
      <ClearFilters />
      <SideBarCategoriesFilter categoriesPromise={categoriesPromise} />
      <PriceRanger PriceMinMaxPromise={PriceMinMaxPromise} />
    </aside>
  );
}

export default ProductsSideBarFilters;
