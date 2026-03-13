import { useEffect, useState, useTransition } from "react";
import {
  COMMENT_MAX_LENGTH,
  SUCCESS_MESSAGE_DELETE_DELAY,
} from "../consts/review.constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReviewSchema } from "../validators/review.schema";
import FormInput from "@/shared/components/common/FormInput";
import InterActiveRatingStars from "@/shared/components/ui/InterActiveRatingStars";
import Button from "@/shared/components/common/Button";
import MiniLoader from "@/shared/components/common/MiniLoader";
import FormStateMessage from "@/shared/components/common/FormStateMessage";
import { CreateReviewInputs } from "../types/review.types";
import { createReviewAction } from "../actions/create-review.action";

function AddReviewForm({ productId }: { productId: number }) {
  const [formState, setFormState] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateReviewInputs>({
    resolver: zodResolver(CreateReviewSchema),
    defaultValues: {
      comment: "",
      reviewerName: "",
      reviewerEmail: "",
      productId: productId,
      rating: undefined,
    },
    mode: "onTouched",
  });

  const comment = watch("comment");
  const rating = watch("rating");
  const textAreaMaxLength = COMMENT_MAX_LENGTH;

  useEffect(() => {
    if (!formState?.success) return;
    const id = setTimeout(
      () => setFormState(null),
      SUCCESS_MESSAGE_DELETE_DELAY,
    );
    return () => clearTimeout(id);
  }, [formState]);

  const onSubmit = async (data: CreateReviewInputs) => {
    startTransition(async () => {
      const state = await createReviewAction(data);

      if (state.success) reset();

      setFormState(state);
    });
  };

  return (
    <form
      className="flex flex-col gap-6 rounded-lg bg-white p-4 md:p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="flex flex-col gap-2">
          <label htmlFor="comment" className="w-fit font-medium">
            Comment
          </label>
          <textarea
            id="comment"
            {...register("comment")}
            placeholder="Enter Your Review"
            disabled={isPending}
            className="h-36 w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 ring-blue-600 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-300"
          />
          <div className="mt-1 flex items-center justify-between text-sm font-medium text-gray-400">
            <span>Maximum</span>
            <span>
              {comment.length} / {textAreaMaxLength}
            </span>
          </div>
        </div>
        {errors.comment?.message && (
          <p className="text-xs font-medium text-red-600 capitalize">
            {errors.comment?.message}
          </p>
        )}
      </div>
      <div className="flex items-start gap-4 sm:gap-8">
        <FormInput
          label="Name"
          register={register("reviewerName")}
          type="text"
          placeholder="Your Name"
          isPending={isPending}
          error={errors.reviewerName?.message}
        />
        <FormInput
          label="Email"
          register={register("reviewerEmail")}
          type="email"
          placeholder="example@gmail.com"
          isPending={isPending}
          error={errors.reviewerEmail?.message}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <InterActiveRatingStars
            rating={rating}
            setRating={(newRating) =>
              setValue("rating", newRating, { shouldValidate: true })
            }
          />
          {errors.rating && (
            <p className="text-xs font-medium text-red-600 capitalize">
              {errors.rating?.message}
            </p>
          )}
        </div>

        <Button disabled={isPending} buttonType="submit">
          {isPending ? <MiniLoader /> : "Submit Review"}
        </Button>
      </div>

      {formState && <FormStateMessage state={formState} />}
    </form>
  );
}

export default AddReviewForm;
