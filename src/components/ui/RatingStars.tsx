"use client";

import { ICONS_MAP } from "@/consts/iconsMap";
import { memo } from "react";

interface RatingStartsProps {
  currentRating: number;
  showRatingNumberLabel?: boolean;
  ratingStarsCount?: number;
  starSize?: number;
  color?: `text-${string}-${number}`;
}

function RatingStars({
  currentRating,
  showRatingNumberLabel = true,
  ratingStarsCount = 5,
  starSize = 24,
  color = "text-amber-400",
}: RatingStartsProps) {
  const fullStars = Math.floor(currentRating);
  const decimal = currentRating - fullStars;
  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
  const extraFullStar = decimal >= 0.75 ? 1 : 0;

  const totalFullStars = fullStars + extraFullStar;
  const totalEmptyStars =
    ratingStarsCount - totalFullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: totalFullStars }).map((_, i) => (
          <ICONS_MAP.star className={color} size={starSize} key={`full-${i}`} />
        ))}

        {hasHalfStar && (
          <ICONS_MAP.halfStar className={color} size={starSize} />
        )}

        {Array.from({ length: totalEmptyStars }).map((_, i) => (
          <ICONS_MAP.emptyStar
            className={color}
            size={starSize}
            key={`empty-${i}`}
          />
        ))}
      </div>
      {showRatingNumberLabel && (
        <span className="text-lg font-semibold text-gray-400">
          (
          {currentRating % 1 === 0
            ? currentRating.toFixed(0)
            : currentRating.toFixed(1)}
          )
        </span>
      )}
    </div>
  );
}

export default memo(RatingStars);
