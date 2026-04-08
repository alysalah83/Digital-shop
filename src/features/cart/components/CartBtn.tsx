"use client";

import { Product } from "@/features/product/types/product.type";
import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useCartQuery } from "../hooks/useCartQuery";
import { useAddToCart } from "../hooks/useAddToCart";
import { useDeleteFromCart } from "../hooks/useDeleteFromCart";

function CartBtn({ product }: { product: Product }) {
  const { id } = product;
  const { isProductInCart } = useCartQuery();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: deleteFromCart } = useDeleteFromCart();

  const inCart = isProductInCart(id);

  const handleClick = () => {
    if (inCart) deleteFromCart(id);
    else addToCart(product);
  };

  return (
    <ButtonIcon
      icon="cart"
      size="medium"
      rounded="rounded-full"
      ariaLabel="add to cart button"
      isActive={inCart}
      onClick={handleClick}
    />
  );
}

export default CartBtn;
