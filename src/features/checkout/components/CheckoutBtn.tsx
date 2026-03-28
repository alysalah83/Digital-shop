"use client";

import Button from "@/shared/components/common/Button";
import { createCheckoutSession } from "../action/createCheckoutSession";
import { useActionState } from "react";
import toast from "react-hot-toast";

function CheckoutBtn() {
  const [state, action, isPending] = useActionState(
    createCheckoutSession,
    null,
  );
  return (
    <form action={action}>
      <Button buttonType="submit" disabled={isPending}>
        Checkout
      </Button>
    </form>
  );
}

export default CheckoutBtn;
