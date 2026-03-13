"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TableRowClasses } from "./cart.style";
import CartDeleteBtn from "../../../features/cart/components/CartDeleteBtn";
import ProductStockCount from "@/features/product/components/ProductStockCount";
import { CartProductItem } from "@/features/cart/types/cart.types";

function CartTableRow({ item }: { item: CartProductItem }) {
  const {
    quantity,
    productId,
    product: { image, name, price, stock },
  } = item;
  const [count, setCount] = useState(quantity || 1);
  const subtotalPrice = price * count;
  const priceClasses = "self-center font-semibold tracking-wide text-lg";

  return (
    <div className={`${TableRowClasses} text-gray-600 last:border-0`}>
      <div className="flex items-center gap-5">
        <div className="h-24 w-24 rounded-md bg-gray-100">
          <div className="relative h-full w-full">
            <Image
              src={image}
              fill
              alt={`${name} image`}
              className="object-contain"
            />
          </div>
        </div>
        <span className="pr-2 text-lg font-medium text-wrap transition duration-300 hover:text-blue-600 lg:font-bold">
          <Link href={`/shop/${productId}`}>{name}</Link>
        </span>
      </div>
      <div className={priceClasses}>${price}</div>
      <div className="flex items-center">
        <ProductStockCount
          initialCount={count}
          stock={stock}
          setOutSideCount={setCount}
        />
      </div>
      <div className={priceClasses}>${subtotalPrice}</div>
      <div className="self-center">
        <CartDeleteBtn productId={productId} />
      </div>
    </div>
  );
}

export default CartTableRow;
