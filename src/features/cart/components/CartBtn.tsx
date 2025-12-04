"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { addToCart, deleteFromCart } from "../actions/cart.action";
import { useOptimistic, useTransition } from "react";

function CartBtn({
  productId,
  isProductInCart,
}: {
  productId: number;
  isProductInCart: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticInCart, setOptimisticInCart] = useOptimistic(
    isProductInCart,
    (state, newState: boolean) => newState,
  );

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticInCart(!isProductInCart);

      if (isProductInCart) await deleteFromCart(productId);
      else await addToCart(productId);
    });
  };

  return (
    <ButtonIcon
      icon="cart"
      size="medium"
      rounded="rounded-full"
      ariaLabel="add to cart button"
      isActive={optimisticInCart}
      isPending={isPending}
      disabled={isPending}
      onClick={handleClick}
    />
  );
}

export default CartBtn;
