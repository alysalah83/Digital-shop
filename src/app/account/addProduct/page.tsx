import AddProductForm from "@/features/account/components/AddProductForm";
import prisma from "@/lib/prisma";
import { Suspense } from "react";

export const metadata = {
  title: "Account | Add product",
};

async function page() {
  "use cache";
  const categories = await prisma.category.findMany({
    select: { name: true, id: true },
  });
  return (
    <div className="w-full bg-gray-100 p-6">
      <main className="mx-auto my-24 max-w-xl rounded-xl bg-white">
        <h2 className="border-b border-gray-100 p-6 text-xl font-semibold tracking-wide text-gray-600 sm:px-8 sm:text-2xl sm:font-bold">
          Enter product information
        </h2>
        <Suspense>
          <AddProductForm categories={categories} />
        </Suspense>
      </main>
    </div>
  );
}

export default page;
