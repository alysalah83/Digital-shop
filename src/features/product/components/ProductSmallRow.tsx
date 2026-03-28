import Image from "next/image";
import { CartProductItem } from "@/features/cart/types/cart.types";

function ProductSmallRow({ cartProduct }: { cartProduct: CartProductItem }) {
  const {
    product: { name, image, price },
    quantity,
  } = cartProduct;
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 text-sm">
      <p className="font-medium text-white">{name}</p>
      <p className="text-blue-300">{quantity}</p>
      <p className="font-semibold text-white tabular-nums">
        ${price * quantity}
      </p>
    </div>
  );
}

export default ProductSmallRow;
