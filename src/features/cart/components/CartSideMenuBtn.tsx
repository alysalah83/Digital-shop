"use client";

import React, { Suspense, useLayoutEffect, useState } from "react";
import CartSideMenu from "./CartSideMenu";
import { CartItemSummery } from "../types/cart.types";
import { useCart } from "@/shared/store/cartStore";

interface CartSideMenuBtn {
  children: React.ReactNode;
  cartProducts: CartItemSummery[];
}

function CartSideMenuBtn({ children, cartProducts }: CartSideMenuBtn) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setCartItems } = useCart();

  useLayoutEffect(() => {
    const clientCartProducts = cartProducts.map((item) => item.product);
    console.log(clientCartProducts);
    setCartItems(clientCartProducts);
  }, [cartProducts]);

  return (
    <>
      <button
        className="relative flex cursor-pointer items-center gap-2"
        onClick={() => setIsMenuOpen((cur) => !cur)}
      >
        {children}
      </button>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 cursor-pointer bg-blue-900/60"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <Suspense>
        <CartSideMenu
          isMenuOpen={isMenuOpen}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </Suspense>
    </>
  );
}

export default CartSideMenuBtn;
