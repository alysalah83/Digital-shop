"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useState } from "react";
import { deleteFromWhiteList } from "../actions/whiteList.action";

function WhiteListDeleteBtn({ productId }: { productId: number }) {
  const [isPending, setIsPending] = useState(false);
  return (
    <ButtonIcon
      btnType="delete"
      icon="trash"
      ariaLabel="remove from whitelist button"
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);
        await deleteFromWhiteList(productId);
        setIsPending(false);
      }}
    />
  );
}

export default WhiteListDeleteBtn;
