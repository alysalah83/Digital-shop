import Button from "@/components/common/Button";
import LandingSectionHeader from "@/components/layouts/LandingSectionHeader";
import Link from "next/link";
import LatestProducts from "./LatestProducts";

async function LatestProductSection() {
  return (
    <section>
      <div className="mx-auto mt-5 max-w-7xl border-t border-gray-300 p-6 pt-15">
        <LandingSectionHeader
          title="new arrivals"
          label="this weak's"
          icon="bag"
          button={
            <Link href="/shop?date=latestProducts">
              <Button type="secondary" size="large">
                view all
              </Button>
            </Link>
          }
        />
        <main className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <LatestProducts />
        </main>
      </div>
    </section>
  );
}

export default LatestProductSection;
