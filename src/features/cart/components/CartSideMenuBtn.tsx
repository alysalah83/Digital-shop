"use client";

import React, { Suspense, useState } from "react";
import CartSideMenu from "./CartSideMenu";
import { CartItemSummery } from "../types/cart.types";

interface CartSideMenuBtn {
  children: React.ReactNode;
  cartProductsPromise: Promise<CartItemSummery[]>;
}

function CartSideMenuBtn({ children, cartProductsPromise }: CartSideMenuBtn) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          cartProductsPromise={cartProductsPromise}
        />
      </Suspense>
    </>
  );
}

export default CartSideMenuBtn;
