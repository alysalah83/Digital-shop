import { Prisma } from "@prisma/client";
import { DETAILS_TAPS } from "../consts/details.consts";

type Tap = (typeof DETAILS_TAPS)[number];

type Review = Prisma.ReviewGetPayload<object>;

export type { Tap, Review };
