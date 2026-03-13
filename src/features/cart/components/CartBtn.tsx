"use client";

import { Product } from "@/features/product/types/product.type";
import ButtonIcon from "@/shared/components/common/ButtonIcon";
import { useCart } from "@/shared/store/cartStore";
import { deleteFromCart } from "../actions/delete-from-cart.action";
import { addToCart } from "../actions/add-to-cart.action";
import toast from "react-hot-toast";

function CartBtn({ product }: { product: Product }) {
  const { id } = product;
  const isProductInCart = useCart((state) => state.isProductInCart(id));
  const addToCartState = useCart((state) => state.addToCart);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const handleClick = async () => {
    if (isProductInCart) {
      removeFromCart(id);
      const response = await deleteFromCart(id);
      if (response.status === "success") toast.success(response.message);
      if (response.status === "error") toast.success(response.error.message);
    } else {
      addToCartState(product);
      const response = await addToCart(id);
      if (response.status === "success") toast.success(response.message);
      if (response.status === "error") toast.success(response.error.message);
    }
  };

  return (
    <ButtonIcon
      icon="cart"
      size="medium"
      rounded="rounded-full"
      ariaLabel="add to cart button"
      isActive={isProductInCart}
      onClick={handleClick}
    />
  );
}

export default CartBtn;
