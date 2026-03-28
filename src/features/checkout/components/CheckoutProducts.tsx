import { CartProductItem } from "@/features/cart/types/cart.types";
import ProductSmallRow from "@/features/product/components/ProductSmallRow";
import { use } from "react";

function CheckoutProducts({
  cartProductsPromise,
}: {
  cartProductsPromise: Promise<CartProductItem[]>;
}) {
  const cartProducts = use(cartProductsPromise);
  return (
    <>
      {cartProducts.map((cartProduct) => (
        <ProductSmallRow cartProduct={cartProduct} key={cartProduct.id} />
      ))}
    </>
  );
}

export default CheckoutProducts;
