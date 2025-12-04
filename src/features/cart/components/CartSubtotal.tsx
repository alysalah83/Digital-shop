import Button from "@/components/common/Button";
import { CartItem } from "../types/cart.types";

function CartSubtotal({ items }: { items: CartItem[] }) {
  const itemsBalance = items.reduce((sum, item) => sum + item.product.price, 0);

  return (
    <div className="mt-10 flex w-fit flex-col rounded-lg bg-white">
      <h3 className="border-b border-gray-200 p-6 text-xl font-bold tracking-wide text-gray-800 lg:text-2xl">
        Order Summery
      </h3>
      <div className="p-6">
        <div className="flex justify-between border-b border-gray-200 pb-5 text-lg font-bold text-gray-600 lg:text-xl">
          <span>Product</span>
          <span>Subtotal</span>
        </div>
        <ul className="text-gray-500">
          {items.map((item) => (
            <CardOrderItem item={item} key={item.id} />
          ))}
          <li className="mb-3 flex justify-between py-5 text-xl font-bold text-gray-700 lg:font-black">
            <span>Total</span>
            <span>${itemsBalance}</span>
          </li>
        </ul>
        <Button>process check out</Button>
      </div>
    </div>
  );
}

function CardOrderItem({ item }: { item: CartItem }) {
  const {
    product: { name, price },
  } = item;

  return (
    <li className="flex justify-between gap-4 border-b border-gray-200 py-5 last:border-0">
      <span className="font-medium">{name}</span>
      <span className="font-semibold">${price}</span>
    </li>
  );
}

export default CartSubtotal;
