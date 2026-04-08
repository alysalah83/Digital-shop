import { useQuery } from "@tanstack/react-query";
import { CartProductItem } from "../types/cart.types";

export const CART_QUERY_KEY = ["cart-items"];

export function useCartQuery() {
  const query = useQuery<CartProductItem[]>({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  const cartItems = query.data ?? [];
  const cartItemsCount = cartItems.length;
  const cartItemsSubtotal = Number(
    cartItems.reduce((sum, item) => sum + item.product.price, 0).toFixed(2),
  );

  const isProductInCart = (productId: number) => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const getProductQuantity = (productId: number) => {
    return (
      cartItems.find((item) => item.product.id === productId)?.quantity || 1
    );
  };

  return {
    ...query,
    cartItems,
    cartItemsCount,
    cartItemsSubtotal,
    isProductInCart,
    getProductQuantity,
  };
}
