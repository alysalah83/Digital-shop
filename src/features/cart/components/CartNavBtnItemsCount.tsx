"use client";

import { useCart } from "@/store/cartStore";

function CartNavBtnItemsCount({
  CartNavBtnItemsCount,
}: {
  CartNavBtnItemsCount: number;
}) {
  const { cartProductsCount } = useCart();

  const isInit = CartNavBtnItemsCount !== 0 && cartProductsCount() === 0;

  return (
    <span className="absolute -top-2 -left-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-blue-50">
      {isInit ? CartNavBtnItemsCount : cartProductsCount()}
    </span>
  );
}

export default CartNavBtnItemsCount;
