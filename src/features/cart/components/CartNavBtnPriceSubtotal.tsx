"use client";

import { useCartQuery } from "../hooks/useCartQuery";

function CartNavBtnPriceSubtotal() {
  const { cartItemsSubtotal } = useCartQuery();

  return (
    <p className="text-sm font-semibold capitalize">
      ${cartItemsSubtotal.toFixed(1)}
    </p>
  );
}

export default CartNavBtnPriceSubtotal;
