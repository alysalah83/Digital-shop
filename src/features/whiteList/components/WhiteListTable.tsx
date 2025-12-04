import WhiteListTableRow from "./WhiteListTableRow";
import { WhiteListItem } from "../types/whiteList.type";
import { whiteListTableRowClasses } from "../styles/whiteList.style";

function WhiteListTable({
  whiteListItems,
}: {
  whiteListItems: WhiteListItem[];
}) {
  return (
    <>
      <header
        className={`${whiteListTableRowClasses} pt-0 text-xl font-semibold tracking-wide text-gray-800`}
      >
        <div>Product</div>
        <div>Price</div>
        <div>Stock Status</div>
        <div>Delete</div>
      </header>
      {whiteListItems.map((item) => (
        <WhiteListTableRow item={item} key={item.productId} />
      ))}
    </>
  );
}

export default WhiteListTable;
