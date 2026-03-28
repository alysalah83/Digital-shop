"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { ActionResponse } from "@/shared/types";
import { redirect } from "next/navigation";

export async function createCheckoutSession(): Promise<ActionResponse> {
  let checkoutUrl: string;

  try {
    const authSession = await auth();
    const userId = authSession?.user?.id;
    if (!userId)
      return { status: "error", error: { message: "No user ID provided" } };

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0)
      return { status: "error", error: { message: "Cart is empety" } };

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: item.product.image ? [item.product.image] : [],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.URL}/`,
      cancel_url: `${process.env.URL}/checkout`,
      metadata: {
        userId: userId,
      },
    });

    checkoutUrl = session.url!;
  } catch (error) {
    return { status: "error", error: { message: "something went wrong" } };
  }
  redirect(checkoutUrl);
}
