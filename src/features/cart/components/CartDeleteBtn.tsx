"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { useState } from "react";
import { deleteFromCart } from "../actions/cart.action";

function CartDeleteBtn({ productId }: { productId: number }) {
  const [isPending, setIsPending] = useState(false);
  return (
    <ButtonIcon
      btnType="delete"
      icon="trash"
      ariaLabel="remove from cart button"
      disabled={isPending}
      onClick={async () => {
        setIsPending(true);
        await deleteFromCart(productId);
        setIsPending(false);
      }}
    />
  );
}

export default CartDeleteBtn;
