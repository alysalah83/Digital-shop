"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { useOptimistic, useState, useTransition } from "react";
import { toggleWhiteList } from "../actions/whiteList.action";

function WhiteListBtn({
  productId,
  initIsProductWhiteListed,
}: {
  productId: number;
  initIsProductWhiteListed: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticWhiteListed, setOptimisticWhiteListed] = useOptimistic(
    initIsProductWhiteListed,
  );

  const handleToggleWhiteList = () => {
    startTransition(async () => {
      setOptimisticWhiteListed((cur) => !cur);
      await toggleWhiteList(productId);
    });
  };

  return (
    <ButtonIcon
      icon={`${optimisticWhiteListed ? "filledHeart" : "heart"}`}
      size="medium"
      rounded="rounded-full"
      ariaLabel="add to whiteList button"
      isActive={optimisticWhiteListed}
      isPending={isPending}
      disabled={isPending}
      onClick={handleToggleWhiteList}
    />
  );
}

export default WhiteListBtn;
