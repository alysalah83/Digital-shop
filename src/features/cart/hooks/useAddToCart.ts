import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../actions/add-to-cart.action";
import { CART_QUERY_KEY } from "./useCartQuery";
import toast from "react-hot-toast";
import { CartProductItem } from "../types/cart.types";
import { Product } from "@/features/product/types/product.type";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Product) => {
      const response = await addToCart(product.id);
      if (response.status === "error")
        throw new Error(response.error.message || "Failed to add to cart");
      return response;
    },
    onMutate: async (product) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<CartProductItem[]>(CART_QUERY_KEY) || [];

      const existingItem = previousCart.find(
        (item) => item.productId === product.id,
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = previousCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item,
        );
      } else {
        updatedCart = [
          ...previousCart,
          {
            id: -Date.now(),
            productId: product.id,
            quantity: 1,
            product,
            userId: null,
            guestId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          } as CartProductItem,
        ];
      }

      queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      return { previousCart };
    },
    onSuccess: (data) => {
      if (
        data.status === "success" &&
        "payload" in data &&
        data.payload?.cartProduct
      ) {
        const { cartProduct } = data.payload;
        queryClient.setQueryData(
          CART_QUERY_KEY,
          (prevCart: CartProductItem[]) => {
            const existingItem = prevCart.find(
              (item) => item.productId === cartProduct?.product?.id,
            );
            if (existingItem) {
              return prevCart.map((item) =>
                item.productId === cartProduct.product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              );
            }
            return [...prevCart, cartProduct];
          },
        );
      }
      toast.success(data.message);
    },
    onError: (error: Error, _newProduct, context) => {
      if (context?.previousCart)
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}
