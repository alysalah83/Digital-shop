import Button from "@/components/common/Button";
import { ICONS_MAP } from "@/consts/iconsMap";
import Link from "next/link";
import { CartItemSummery } from "../types/cart.types";
import { use } from "react";
import EmptyPage from "@/components/common/EmptyPage";
import CartSideMenuItem from "./CartSideMenuItem";

interface CartSideMenu {
  isMenuOpen: boolean;
  onMenuClose: () => void;
  cartProductsPromise: Promise<CartItemSummery[]>;
}

function CartSideMenu({
  isMenuOpen,
  onMenuClose,
  cartProductsPromise,
}: CartSideMenu) {
  const cartProducts = use(cartProductsPromise);

  const cartItemsCount = cartProducts.length;
  const cartItemsTotalPrice = Number(
    cartProducts.reduce((sum, item) => sum + item.product.price, 0).toFixed(2),
  );

  return (
    <div
      className={`fixed right-0 bottom-0 z-40 flex h-screen max-w-[85%] flex-col transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} min-w-3xs bg-white p-4 lg:min-w-96 lg:p-8 xl:min-w-lg`}
    >
      <div className="mb-12 flex items-center justify-between border-b border-gray-200 pb-5">
        <h2 className="text-xl font-bold tracking-wide capitalize lg:text-2xl lg:font-semibold">
          cart view
        </h2>
        <ICONS_MAP.close
          onClick={onMenuClose}
          className="h-7 w-7 cursor-pointer text-gray-500 transition duration-300 hover:text-gray-700"
        />
      </div>
      {cartItemsCount > 0 ? (
        <ul className="flex flex-col gap-6 overflow-auto lg:gap-8">
          {cartProducts?.map((item) => (
            <CartSideMenuItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <EmptyPage label="your cart is empty!" icon="cart" />
      )}
      <div className="mt-auto flex flex-col gap-5 border-t border-gray-200 pt-5">
        <div className="flex items-center justify-between text-lg font-semibold tracking-wide lg:text-xl">
          <span>Subtotal :</span>
          <span className="font-bold">${cartItemsTotalPrice}</span>
        </div>
        <div>
          <Link href="/cart" className="w-full">
            <Button onClick={onMenuClose} size="large" scratch={true}>
              view cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartSideMenu;
