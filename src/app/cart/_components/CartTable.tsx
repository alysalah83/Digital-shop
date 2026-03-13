import { CartProductItem } from "@/features/cart/types/cart.types";
import CartTableRow from "./CartTableRow";
import { TableRowClasses } from "./cart.style";

function CartTable({ cartProducts }: { cartProducts: CartProductItem[] }) {
  return (
    <>
      <header
        className={`${TableRowClasses} pt-0 text-xl font-semibold tracking-wide text-gray-800`}
      >
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
        <div>Delete</div>
      </header>
      {cartProducts.map((item) => (
        <CartTableRow item={item} key={item.productId} />
      ))}
    </>
  );
}

export default CartTable;
