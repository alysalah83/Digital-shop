import RatingStars from "@/shared/components/ui/RatingStars";
import { Review } from "../types/review.types";
import { format } from "date-fns";
import Image from "next/image";
import dummyProfileImg from "@/../public/dummy-profile.png";

function ReviewItem({ review }: { review: Review }) {
  const { rating, comment, reviewerName, createdAt } = review;

  const formatCreatedAt = format(createdAt, "MMM EEEE d, yyyy");

  return (
    <div className="rounded-lg bg-white p-4 md:p-6">
      <div className="mb-8 flex w-full items-center gap-4">
        <Image
          src={dummyProfileImg}
          alt={`${reviewerName} profile picture`}
          width={50}
          height={50}
          placeholder="blur"
          className="rounded-full"
        />
        <span className="font-medium">{reviewerName}</span>
        <span className="ml-auto">
          <RatingStars showRatingNumberLabel={false} currentRating={rating} />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg">{comment}</p>
        <span className="text-sm font-medium text-gray-400">
          {formatCreatedAt}
        </span>
      </div>
    </div>
  );
}

export default ReviewItem;
