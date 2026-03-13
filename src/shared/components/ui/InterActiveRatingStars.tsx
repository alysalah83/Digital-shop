"use client";

import { ICONS_MAP } from "@/shared/icons/iconsMap";
import { memo, useState } from "react";

const Star = ICONS_MAP.star;
const EmptyStar = ICONS_MAP.emptyStar;

interface InteractiveRatingStarsProps {
  ratingStartsCount?: number;
  starColor?: `text-${string}-${number}`;
  starSize?: number;
  rating: number;
  setRating: (newRating: number) => void;
}

function InteractiveRatingStars({
  ratingStartsCount = 5,
  starColor = "text-amber-400",
  starSize = 24,
  rating,
  setRating,
}: InteractiveRatingStarsProps) {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex">
      {Array.from({ length: ratingStartsCount }, (_, index) => index + 1).map(
        (starNumber) => {
          const isFilled = starNumber <= (hoveredStar || rating);
          const Icon = isFilled ? Star : EmptyStar;
          return (
            <button
              onPointerEnter={() => setHoveredStar(starNumber)}
              onPointerLeave={() => setHoveredStar(0)}
              onClick={() => setRating(rating === starNumber ? 0 : starNumber)}
              aria-label={`Rate ${starNumber} out of ${ratingStartsCount}`}
              aria-pressed={rating === starNumber}
              type="button"
              key={starNumber}
            >
              <Icon className={`${starColor} cursor-pointer`} size={starSize} />
            </button>
          );
        },
      )}
    </div>
  );
}

export default memo(InteractiveRatingStars);
