import PopularPage from "./_components/PopularPage";
import { ProductsLayoutShape } from "@/features/product/types/product.type";

export const metadata = {
  title: "Popular",
};

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; layoutShape?: ProductsLayoutShape }>;
}) {
  const { page, layoutShape } = await searchParams;
  const pageNum = Number(page) || 1;

  return <PopularPage page={pageNum} layoutShape={layoutShape} />;
}

export default page;
