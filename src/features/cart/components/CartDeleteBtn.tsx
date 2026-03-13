"use client";

import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useCart } from "@/shared/store/cartStore";
import { deleteFromCart } from "../actions/delete-from-cart.action";
import toast from "react-hot-toast";

function CartDeleteBtn({ productId }: { productId: number }) {
  const removeFromCart = useCart((state) => state.removeFromCart);
  return (
    <ButtonIcon
      btnType="delete"
      icon="trash"
      ariaLabel="remove from cart button"
      onClick={async () => {
        removeFromCart(productId);
        const response = await deleteFromCart(productId);
        if (response.status === "success") toast.success(response.message);
        if (response.status === "error") toast.error(response.error.message);
      }}
    />
  );
}

export default CartDeleteBtn;
