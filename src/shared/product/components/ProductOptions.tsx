import Button from "@/components/common/Button";
import ButtonIcon from "@/components/common/ButtonIcon";

function ProductOptions({ render }: { render: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <ButtonIcon
          icon="cart"
          ariaLabel="add to cart button"
          rounded="rounded-full"
        />
        <ButtonIcon
          icon="heart"
          ariaLabel="add to whitelist button"
          rounded="rounded-full"
        />
      </div>
      <div className="flex items-center gap-6">
        {render}
        <Button>purchase now</Button>
      </div>
    </>
  );
}

export default ProductOptions;
