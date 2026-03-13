import z from "zod";
import { CreateReviewSchema } from "../validators/review.schema";

export type { Review } from "@/generated/prisma/client";

type CreateReviewInputs = z.infer<typeof CreateReviewSchema>;

export type { CreateReviewInputs };
