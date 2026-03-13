"use server";

import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CreateProductInputs } from "../types/account.type";
import { put } from "@vercel/blob";

export async function signoutAction() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/");

  await signOut({ redirectTo: "/" });
}

export async function updateUser(updatedFields: {
  name: string | undefined;
  address: string | undefined;
}) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return redirect("/login");

    await prisma.user.update({
      where: { id: userId },
      data: updatedFields,
    });

    return { success: true, message: "user has been updated" };
  } catch (error) {
    console.log(error);
    return { error: true, message: "something went wrong" };
  }
}

export async function addProduct(
  newProductInputs: CreateProductInputs,
  imageFile: File,
) {
  try {
    const [session, blob] = await Promise.all([
      auth(),
      put(`products/${imageFile.name}`, imageFile, { access: "public" }),
    ]);

    const userId = session?.user?.id;

    if (!userId) return redirect("/login");

    const { category: categoryId, ...newData } = newProductInputs;

    await prisma.product.create({
      data: {
        ...newData,
        image: blob.url,
        userId,
        categoryId,
      },
    });
    revalidatePath("/account/mangeProducts");
    revalidatePath("/shop");
    return { success: true, message: "Product has been added" };
  } catch (err) {
    console.error(err);
    return { error: true, message: "something went wrong" };
  }
}

export async function deleteProduct(productId: number) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return redirect("/login");

    await prisma.product.delete({
      where: {
        userId,
        id: productId,
      },
    });
    revalidatePath("/account/mangeProducts");
    revalidateTag("shopProducts", "max");
  } catch (err) {
    console.error(err);
    return { error: true, message: "something went wrong" };
  }
}
