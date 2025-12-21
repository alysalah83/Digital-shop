import { CartProduct } from "@/features/cart/types/cart.types";
import { create } from "zustand";

interface CartStore {
  carProductItems: CartProduct[];
  setCartItems: (products: CartProduct[]) => void;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  isProductInCart: (productId: number) => boolean;
  cartProductsSubtotal: () => number;
  cartProductsCount: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  carProductItems: [],
  setCartItems: (products) => set(() => ({ carProductItems: products })),
  addToCart: (product) =>
    set((state) => ({
      carProductItems: [...state.carProductItems, product],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      carProductItems: state.carProductItems.filter(
        (item) => item.id !== productId,
      ),
    })),
  isProductInCart: (productId) => {
    const { carProductItems } = get();
    return carProductItems.some((item) => item.id === productId);
  },
  cartProductsSubtotal: () => {
    const { carProductItems } = get();
    return carProductItems.reduce((sub, item) => sub + item.price, 0);
  },
  cartProductsCount: () => {
    const { carProductItems } = get();
    return carProductItems.length;
  },
}));
