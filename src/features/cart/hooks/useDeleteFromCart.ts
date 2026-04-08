import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromCart } from "../actions/delete-from-cart.action";
import { CART_QUERY_KEY } from "./useCartQuery";
import toast from "react-hot-toast";
import { CartProductItem } from "../types/cart.types";
import { ActionResponse } from "@/shared/types";

export function useDeleteFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      const response = await deleteFromCart(productId);
      if (response.status === "error")
        return toast.error(response.error.message);
      return response;
    },
    onMutate: async (productId) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });
      const previousCart =
        queryClient.getQueryData<CartProductItem[]>(CART_QUERY_KEY) || [];

      const updatedCart = previousCart.filter(
        (item) => item.productId !== productId,
      );

      queryClient.setQueryData(CART_QUERY_KEY, updatedCart);
      return { previousCart };
    },
    onSuccess: (data) => {
      if (typeof data !== "string") toast.success(data?.message);
    },
    onError: (error: Error, _productId, context) => {
      if (context?.previousCart)
        queryClient.setQueryData(CART_QUERY_KEY, context.previousCart);

      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}
