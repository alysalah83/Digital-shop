import { TableRowClasses } from "../styles/style";
import { CartItem } from "../types/cart.types";
import CartTableRow from "./CartTableRow";

function CartTable({ cartItems }: { cartItems: CartItem[] }) {
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
      {cartItems.map((item) => (
        <CartTableRow item={item} key={item.productId} />
      ))}
    </>
  );
}

export default CartTable;
