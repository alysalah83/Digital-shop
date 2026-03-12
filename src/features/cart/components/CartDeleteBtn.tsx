"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { deleteFromCart } from "../actions/cart.action";
import { useCart } from "@/shared/store/cartStore";

function CartDeleteBtn({ productId }: { productId: number }) {
  const { removeFromCart } = useCart();
  return (
    <ButtonIcon
      btnType="delete"
      icon="trash"
      ariaLabel="remove from cart button"
      onClick={async () => {
        removeFromCart(productId);
        await deleteFromCart(productId);
      }}
    />
  );
}

export default CartDeleteBtn;
