import { list, put } from "@vercel/blob";
// import { Prisma, PrismaClient } from "@prisma/client";
// import { category, products } from "./data";

import prisma from "@/lib/prisma";
import { products } from "./data";
import { Prisma } from "@prisma/client";

// const prisma = new PrismaClient();

// formatCategory();
// import prisma from "@/lib/prisma"; // Adjust path as needed
// import { put } from "@vercel/blob";
// import { Prisma } from "@prisma/client";

// // Import your JSON data
// import { category as categoryData } from "./data"; // Adjust path to your JSON file

// interface CategoryInput {
//   category: string;
//   image: string; // URL to fetch image from (if images are online)
// }

// export async function uploadCategories() {
//   try {
//     console.log("🚀 Starting category upload...");

//     const categories = await Promise.all(
//       categoryData.map(async (cat: CategoryInput) => {
//         let imageUrl: string = "";

//         // If you have image URLs to download and re-upload
//         if (cat.image) {
//           console.log(`📥 Downloading image for: ${cat.category}`);
//           const response = await fetch(cat.image);
//           const arrayBuffer = await response.arrayBuffer();
//           const fileBuffer = Buffer.from(arrayBuffer);

//           // Upload to Vercel Blob
//           const blob = await put(`categories/${cat.category}.jpg`, fileBuffer, {
//             access: "public",
//             contentType: "image/jpeg",
//           });
//           imageUrl = blob.url;
//           console.log(`✅ Uploaded: ${cat.category} -> ${blob.url}`);
//         }
//         // If you have local images
//         else if (cat.image) {
//           const fs = await import("fs/promises");
//           const fileBuffer = await fs.readFile(cat.image);

//           const blob = await put(`categories/${cat.category}.jpg`, fileBuffer, {
//             access: "public",
//             contentType: "image/jpeg",
//           });
//           imageUrl = blob.url;
//           console.log(`✅ Uploaded: ${cat.category} -> ${blob.url}`);
//         }

//         return {
//           name: cat.category,
//           image: imageUrl,
//           // Add other fields as needed
//         };
//       }),
//     );

//     // Insert into database
//     console.log("💾 Inserting into database...");
//     const result = await prisma.category.createMany({
//       data: categories,
//       skipDuplicates: true, // Skip if category already exists
//     });

//     console.log(`✅ Successfully uploaded ${result.count} categories!`);
//     return result;
//   } catch (error) {
//     console.error("❌ Error uploading categories:", error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Run the function
// uploadCategories();

export async function uploadAndCreateProducts() {
  try {
    console.log("🚀 Starting product upload...");

    // Check Vercel Blob token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("❌ BLOB_READ_WRITE_TOKEN not found!");
    }

    // 1. Verify the user exists
    const userId = "cmibpxyip0000buebtgd4857r";
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(
        `❌ User with ID ${userId} not found! Please check the user ID.`,
      );
    }

    console.log(`✅ Using user: ${user.name || user.email || userId}`);

    console.log(`\n📦 Processing ${products.length} products...\n`);

    let successCount = 0;
    let failCount = 0;

    for (const [index, product] of products.entries()) {
      try {
        console.log(
          `[${index + 1}/${products.length}] Processing: ${product.title}`,
        );

        // 2. Download and upload image to Vercel Blob
        let imageUrl = "";
        if (product.image) {
          console.log(`   📥 Downloading image from: ${product.image}`);

          const response = await fetch(product.image);

          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
          }

          const arrayBuffer = await response.arrayBuffer();
          const fileBuffer = Buffer.from(arrayBuffer);

          console.log(
            `   📦 Downloaded: ${(fileBuffer.length / 1024).toFixed(2)} KB`,
          );

          // Get file extension from URL
          const urlParts = product.image.split(".");
          const fileExtension = urlParts[urlParts.length - 1]
            .split("?")[0]
            .toLowerCase();
          const validExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
          const ext = validExtensions.includes(fileExtension)
            ? fileExtension
            : "jpg";

          // Create clean filename
          const cleanTitle = product.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

          const fileName = `products/${product.category}/${cleanTitle}.${ext}`;

          console.log(`   ⬆️  Uploading to: ${fileName}`);

          // Upload to Vercel Blob
          const blob = await put(fileName, fileBuffer, {
            access: "public",
            contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
          });

          imageUrl = blob.url;
          console.log(
            `   ✅ Uploaded to Vercel: ${blob.url.substring(0, 60)}...`,
          );
        }

        // 3. Get category by name
        const category = await prisma.category.findUnique({
          where: { name: product.category },
        });

        if (!category) {
          throw new Error(`Category "${product.category}" not found`);
        }

        // 4. Create product in database
        const createdProduct = await prisma.product.create({
          data: {
            name: product.title,
            brand: product.brand,
            description: product.description,
            image: imageUrl,
            price: product.price,
            discountPercentage: product.discountPercentage || 0,
            rating: product.rating || 0,
            stock: product.stock || 0,
            categoryId: category.id,
            userId: userId, // Using your specific user ID
          },
        });

        // 5. Create reviews if they exist
        if (product.reviews && product.reviews.length > 0) {
          console.log(`   📝 Creating ${product.reviews.length} reviews...`);

          await prisma.review.createMany({
            data: product.reviews.map((review) => ({
              comment: review.comment,
              rating: review.rating,
              reviewerName: review.reviewerName,
              reviewerEmail: review.reviewerEmail,
              productId: createdProduct.id,
            })),
          });
        }

        console.log(
          `   ✅ Product created successfully (ID: ${createdProduct.id})\n`,
        );
        successCount++;
      } catch (error: any) {
        console.error(
          `   ❌ Failed to process ${product.title}:`,
          error.message,
        );
        failCount++;
        console.log(); // Empty line for readability
      }
    }

    // Summary
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📊 Upload Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📦 Total: ${products.length}`);
    console.log(`${"=".repeat(60)}\n`);

    // Show sample of created products
    const createdProducts = await prisma.product.findMany({
      take: 5,
      include: {
        category: true,
        user: { select: { name: true, email: true } },
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    console.log(`📋 Sample created products:\n`);
    createdProducts.forEach((p) => {
      console.log(`  ${p.name}`);
      console.log(`    Category: ${p.category.name}`);
      console.log(`    Price: $${p.price}`);
      console.log(`    Rating: ${p.rating} ⭐`);
      console.log(`    Reviews: ${p.reviews.length}`);
      console.log(`    Image: ${p.image.substring(0, 60)}...`);
      console.log();
    });

    // Final database stats
    const totalProducts = await prisma.product.count();
    const totalReviews = await prisma.review.count();

    console.log(`\n📈 Database Stats:`);
    console.log(`   Products: ${totalProducts}`);
    console.log(`   Reviews: ${totalReviews}`);
    console.log(`   Categories: ${await prisma.category.count()}`);
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
uploadAndCreateProducts();
// export async function reviewsSeed() {
//   const reviewsArr = products.flatMap((product, index) =>
//     product.reviews.map(({ date, ...review }) => ({
//       ...review,
//       productId: index + 1,
//     })),
//   );
//   await prisma.review.createMany({ data: reviewsArr });
// }

// reviewsSeed();
