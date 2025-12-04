"use server";

import prisma from "@/lib/prisma";
import {
  CreateReviewInput,
  CreateReviewSchema,
} from "../validators/review.schema";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import z from "zod";

export async function addReview(data: CreateReviewInput) {
  console.log(data);
  const result = CreateReviewSchema.safeParse(data);

  if (result.error) {
    const errorEntries = Object.entries(
      z.flattenError(result.error).fieldErrors,
    );
    return {
      success: false,
      message: `Invalid ${errorEntries.at(0)?.at(0)}: ${errorEntries.at(0)?.at(1)?.at(0)?.replace("Invalid input: ", "")}`,
    };
  }

  try {
    await prisma.review.create({ data: result.data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError)
      return {
        success: false,
        message: "Invalid data format",
      };
    else
      return {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      };
  }

  revalidatePath(`/shop/${data.productId}`);

  return { success: true, message: "your review has been added successfully" };
}
