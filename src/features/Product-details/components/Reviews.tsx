import ReviewItem from "./ReviewItem";
import { Review } from "../types/details.types";
import AddReviewForm from "./AddReviewForm";

function Reviews({
  reviews,
  productId,
}: {
  reviews: Review[];
  productId: number;
}) {
  return (
    <div className="flex flex-col gap-4 gap-y-12 lg:flex-row">
      <div className="order-2 flex-1 lg:order-1">
        <h3 className="mb-7 text-xl font-semibold capitalize lg:text-2xl lg:font-medium">
          {reviews.length} reviews for this product:
        </h3>
        <div className="flex flex-col gap-5">
          {reviews.toReversed().map((review) => (
            <ReviewItem review={review} key={review.id} />
          ))}
        </div>
      </div>
      <div className="lg:order-2">
        <h3 className="mb-7 text-xl font-semibold capitalize lg:text-2xl lg:font-medium">
          add your review:
        </h3>
        <AddReviewForm productId={productId} />
      </div>
    </div>
  );
}

export default Reviews;
