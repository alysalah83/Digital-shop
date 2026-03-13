import { ShopSearchParams } from "./_components/filters/filters.types";
import ShopPage from "./_components/ShopPage";

export const metadata = {
  title: "Shop",
};

async function page({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const params = await searchParams;
  return <ShopPage searchParams={params} />;
}

export default page;
