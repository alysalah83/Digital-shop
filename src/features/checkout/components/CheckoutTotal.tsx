import { CartProductItem } from "@/features/cart/types/cart.types";
import { use } from "react";

function CheckoutTotal({
  cartProductsPromise,
}: {
  cartProductsPromise: Promise<CartProductItem[]>;
}) {
  const cartProducts = use(cartProductsPromise);

  return (
    <span className="font-bold text-blue-900">
      $
      {cartProducts.reduce(
        (acc, cur) => cur.quantity * cur.product.price + acc,
        0,
      )}
    </span>
  );
}

export default CheckoutTotal;
