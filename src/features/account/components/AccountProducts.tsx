import { auth } from "@/auth";
import EmptyPage from "@/shared/components/common/EmptyPage";
import prisma from "@/lib/prisma";
import ProductWithActionsCard from "@/shared/product/components/ProductWithActionsCard";

async function AccountProducts() {
  const session = await auth();
  const products = await prisma.product.findMany({
    where: { userId: session?.user?.id },
  });
  const isEmpty = products.length === 0;

  return (
    <main
      className={`my-14 ${isEmpty ? "mx-auto max-w-xl" : "max-h-[700px] w-full overflow-y-scroll"} rounded-xl bg-white px-4 py-6`}
    >
      {!isEmpty ? (
        products.map((product) => (
          <ProductWithActionsCard productItem={product} key={product.id} />
        ))
      ) : (
        <EmptyPage
          icon="cart"
          label="No products to display!"
          goToBtnLabel="Add products"
          goToBtnHref="/account/addProduct"
        />
      )}
    </main>
  );
}

export default AccountProducts;
