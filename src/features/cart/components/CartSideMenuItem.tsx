import Image from "next/image";
import Link from "next/link";
import { CartItemSummery } from "../types/cart.types";
import ButtonIcon from "@/components/common/ButtonIcon";
import CartDeleteBtn from "./CartDeleteBtn";

interface CartSideMenuItem {
  item: CartItemSummery;
}

function CartSideMenuItem({ item }: CartSideMenuItem) {
  const {
    id,
    quantity,
    product: { image, name, price, id: productId },
  } = item;

  return (
    <li className="flex gap-2">
      <div className="h-24 w-24 rounded-lg bg-gray-100 lg:h-28 lg:w-28">
        <div className="relative h-full w-full">
          {image && (
            <Image
              src={image}
              fill
              alt={`${name} image`}
              sizes="(max-width: 768px) 96px, 112px"
              className="object-contain p-2"
            />
          )}
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-3 p-3">
        <h4 className="text-warp text-sm font-bold text-gray-500 md:text-base lg:text-lg">
          <Link href={`/shop/${id}`}>
            {name} {quantity !== 1 && quantity && <span>( {quantity} )</span>}
          </Link>
        </h4>
        <span className="font-semibold tracking-wide text-gray-600 lg:font-bold">
          ${price}
        </span>
      </div>
      <div className="flex items-center">
        <CartDeleteBtn productId={productId} />
      </div>
    </li>
  );
}

export default CartSideMenuItem;
