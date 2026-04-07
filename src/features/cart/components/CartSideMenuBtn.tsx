"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import CartSideMenu from "./CartSideMenu";
import { useCart } from "@/shared/store/cartStore";
import { CartProductItem } from "../types/cart.types";
import { createPortal } from "react-dom";

interface CartSideMenuBtn {
  children: React.ReactNode;
  cartProducts: CartProductItem[];
}

function CartSideMenuBtn({ children, cartProducts }: CartSideMenuBtn) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { setCartItems } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    const clientCartProducts = cartProducts.map((item) => item.product);
    setCartItems(clientCartProducts);
  }, [cartProducts]);

  if (!isMounted) return null;

  return (
    <>
      <button
        className="relative flex cursor-pointer items-center gap-2"
        onClick={() => setIsMenuOpen((cur) => !cur)}
      >
        {children}
      </button>
      {createPortal(
        <>
          {isMenuOpen && (
            <div
              className="fixed inset-0 z-[999999] cursor-pointer bg-blue-900/60"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
          )}
          <CartSideMenu
            isMenuOpen={isMenuOpen}
            onMenuClose={() => setIsMenuOpen(false)}
          />
        </>,
        document.body,
      )}
    </>
  );
}

export default CartSideMenuBtn;
