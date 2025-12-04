import prisma from "@/lib/prisma";
import ProductCard from "@/shared/product/components/ProductCard";
import { NEW_SECTION_PRODUCTS_COUNT } from "../consts/main.consts";
import { notFound } from "next/navigation";

async function getLatestProducts() {
  "use cache";
  const newProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: NEW_SECTION_PRODUCTS_COUNT,
    select: {
      image: true,
      name: true,
      price: true,
      brand: true,
      discountPercentage: true,
      rating: true,
      id: true,
      description: true,
    },
  });

  return newProducts;
}

async function LatestProducts() {
  const newProducts = await getLatestProducts();

  if (!newProducts) return notFound();
  return (
    <>
      {newProducts.map((newProduct) => (
        <ProductCard product={newProduct} key={newProduct.id} />
      ))}
    </>
  );
}

export default LatestProducts;
