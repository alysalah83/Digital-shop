import z from "zod";
import { COMMENT_MAX_LENGTH } from "../consts/review.constants";

const CreateReviewSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment must be at least 1 characters")
    .max(
      COMMENT_MAX_LENGTH,
      `Comment must not exceed ${COMMENT_MAX_LENGTH} characters`,
    ),
  rating: z
    .number("Please select a rating")
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  reviewerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  reviewerEmail: z
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  productId: z.number().int().positive(),
});

export { CreateReviewSchema };
