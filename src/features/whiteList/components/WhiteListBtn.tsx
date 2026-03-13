"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useOptimistic, useTransition } from "react";
import { toggleWhiteList } from "../actions/toggle-whitelist.action";
import toast from "react-hot-toast";

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
      const response = await toggleWhiteList(productId);
      if (response.status === "success") toast.success(response.message);
      if (response.status === "error") toast.success(response.error.message);
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
