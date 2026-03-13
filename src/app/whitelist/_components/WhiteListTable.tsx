import { WhiteListProductItem } from "../../../features/whiteList/types/whiteList.type";
import { whiteListTableRowClasses } from "./whiteList.style";
import WhiteListTableRow from "./WhiteListTableRow";

function WhiteListTable({
  whitelistProducts,
}: {
  whitelistProducts: WhiteListProductItem[];
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
      {whitelistProducts.map((item) => (
        <WhiteListTableRow product={item.product} key={item.productId} />
      ))}
    </>
  );
}

export default WhiteListTable;
