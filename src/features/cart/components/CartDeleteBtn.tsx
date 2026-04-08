"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useDeleteFromCart } from "../hooks/useDeleteFromCart";

function CartDeleteBtn({ productId }: { productId: number }) {
  const { mutate: deleteFromCart, isPending } = useDeleteFromCart();

  return (
    <ButtonIcon
      btnType="delete"
      icon="trash"
      ariaLabel="remove from cart button"
      disabled={isPending}
      onClick={() => deleteFromCart(productId)}
    />
  );
}

export default CartDeleteBtn;
