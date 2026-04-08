"use client";

import { useCartQuery } from "../hooks/useCartQuery";

function CartNavBtnItemsCount() {
  const { cartItemsCount } = useCartQuery();

  return (
    <span className="absolute -top-2 -left-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-blue-50">
      {cartItemsCount}
    </span>
  );
}

export default CartNavBtnItemsCount;
