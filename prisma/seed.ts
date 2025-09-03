// import { put } from "@vercel/blob";
// import { PrismaClient, Prisma } from "../src/generated/prisma";
// import { category, products } from "./data";

// const prisma = new PrismaClient();

// export async function formatCategory() {
//   const transformImages = async (imageUrl: string, category: string) => {
//     const response = await fetch(imageUrl);
//     const arrayBuffer = await response.arrayBuffer();
//     const fileBuffer = Buffer.from(arrayBuffer);
//     const { url } = await put(`${category}.jpg`, fileBuffer, {
//       access: "public",
//     });
//     return url;
//   };

//   return (await Promise.all(
//     category.map(async (cat) => ({
//       name: cat.category,
//       image: await transformImages(cat.image, cat.category),
//     }))
//   )) as Prisma.CategoryCreateInput[];
// }

// // export function formateProducts() {
// //   products.map((product) => ({
// //     name: product.title,
// //     brand: product.brand,
// //     description: product.description,
// //     image: product.image,
// //     price: product.price,
// //     discountPercentage: product.discountPercentage,
// //     rating: product.rating,
// //     reviews: product.reviews,
// //     stock: product.reviews,
// //   })) as Prisma.ProductCreateInput[];
// // }

// export async function main() {
//   const category = await formatCategory();
//   for (const u of category) {
//     await prisma.category.create({ data: u });
//   }
// }

// main();
