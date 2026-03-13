"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { deleteProduct } from "../actions/account.actions";
import { useState } from "react";

function AccountDeleteProductBtn({ productId }: { productId: number }) {
  const [isPending, setIsPending] = useState(false);
  return (
    <ButtonIcon
      btnType="delete"
      icon="trash"
      ariaLabel="delete product button"
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);
        await deleteProduct(productId);
        setIsPending(false);
      }}
    />
  );
}

export default AccountDeleteProductBtn;
