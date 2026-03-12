"use client";

import { useCart } from "@/shared/store/cartStore";

function CartNavBtnPriceSubtotal({
  initialCartItemsPriceSubtotal,
}: {
  initialCartItemsPriceSubtotal: number;
}) {
  const { cartProductsSubtotal } = useCart();

  const isInit =
    initialCartItemsPriceSubtotal !== 0 && cartProductsSubtotal() === 0;

  return (
    <p className="text-sm font-semibold capitalize">
      $
      {(isInit
        ? initialCartItemsPriceSubtotal
        : cartProductsSubtotal()
      ).toFixed(2)}
    </p>
  );
}

export default CartNavBtnPriceSubtotal;
