import { CartProductItem } from "@/features/cart/types/cart.types";
import { use } from "react";

function CheckoutOrderSummary({
  cartProductsPromise,
}: {
  cartProductsPromise: Promise<CartProductItem[]>;
}) {
  const cartProducts = use(cartProductsPromise);
  return (
    <span className="text-gray-900">
      $
      {cartProducts.reduce(
        (acc, cur) => cur.quantity * cur.product.price + acc,
        0,
      )}
    </span>
  );
}

export default CheckoutOrderSummary;
