import Image from "next/image";
import Link from "next/link";
import { WhiteListItem } from "../types/whiteList.type";
import { whiteListTableRowClasses } from "../styles/whiteList.style";
import ButtonIcon from "@/shared/components/common/ButtonIcon";
import WhiteListDeleteBtn from "./WhiteListDeleteBtn";

function WhiteListTableRow({ item }: { item: WhiteListItem }) {
  const {
    productId,
    product: { image, name, price, stock },
  } = item;
  const priceClasses = "self-center font-semibold tracking-wide text-lg";

  const inStock = stock > 0;

  return (
    <div className={`${whiteListTableRowClasses} text-gray-600 last:border-0`}>
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
      <div className="flex items-center font-bold tracking-wide capitalize">
        <span className={`${inStock ? "text-green-600" : "text-red-600"}`}>
          {inStock ? "in stock" : "out of stock"}
        </span>
      </div>
      <div className="self-center">
        <WhiteListDeleteBtn productId={productId} />
      </div>
    </div>
  );
}

export default WhiteListTableRow;
