"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useState } from "react";
import { deleteFromWhiteList } from "../actions/delete-from-whitelist.action";
import toast from "react-hot-toast";

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
        const response = await deleteFromWhiteList(productId);
        if (response.status === "success") toast.success(response.message);
        if (response.status === "error") toast.success(response.error.message);
        setIsPending(false);
      }}
    />
  );
}

export default WhiteListDeleteBtn;
