"use client";

import ButtonIcon from "@/components/common/ButtonIcon";
import { addToCart, deleteFromCart } from "../actions/cart.action";
import { useCart } from "@/store/cartStore";
import { ProductWithDescriptionItem } from "@/shared/product/types/product.type";

function CartBtn({
  productId,
  productSummery,
}: {
  productId: number;
  productSummery: ProductWithDescriptionItem;
}) {
  const {
    isProductInCart,
    addToCart: addToCartState,
    removeFromCart,
  } = useCart();

  const isProductInCartState = isProductInCart(productId);

  const handleClick = async () => {
    if (isProductInCartState) {
      removeFromCart(productId);
      await deleteFromCart(productId);
    } else {
      addToCartState({ id: productId, ...productSummery });
      await addToCart(productId);
    }
  };

  return (
    <ButtonIcon
      icon="cart"
      size="medium"
      rounded="rounded-full"
      ariaLabel="add to cart button"
      isActive={isProductInCartState}
      onClick={handleClick}
    />
  );
}

export default CartBtn;
