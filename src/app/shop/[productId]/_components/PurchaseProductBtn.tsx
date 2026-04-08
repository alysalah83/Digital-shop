"use client";

import Button from "@/shared/components/common/Button";
import { addToCart } from "@/features/cart/actions/add-to-cart.action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

function PurchaseProductBtn({ productId }: { productId: number }) {
  const { push } = useRouter();
  const [state, action, isPending] = useActionState(
    addToCart.bind(null, productId),
    null,
  );

  useEffect(() => {
    if (state?.status === "success") push("/checkout");
  }, [state]);

  return (
    <form action={action}>
      <Button buttonType="submit" disabled={isPending}>
        {isPending ? "Adding to cart..." : "purchase now"}
      </Button>
    </form>
  );
}

export default PurchaseProductBtn;
