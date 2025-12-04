import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function getOrCreateGuestId(): Promise<string> {
  const cookieStore = await cookies();
  let guestId = cookieStore.get("guestId")?.value;

  if (!guestId) {
    guestId = crypto.randomUUID();
    cookieStore.set("guestId", guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return guestId;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (userId) {
      const cartItems = await prisma.cartItem.findMany({
        where: {
          userId,
        },
        include: { product: true },
      });
      return NextResponse.json(cartItems);
    } else {
      const guestId = await getOrCreateGuestId();
      const cartItems = await prisma.cartItem.findMany({
        where: {
          guestId,
        },
        include: { product: true },
      });
      return NextResponse.json(cartItems);
    }
  } catch (err) {
    console.error("Error fetching cart:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// DELETE - Remove item from cart
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 },
      );
    }

    if (session?.user?.id) {
      // Verify item belongs to user before deleting
      await prisma.cartItem.deleteMany({
        where: {
          id: Number(itemId),
          userId: session.user.id,
        },
      });
    } else {
      const guestId = await getOrCreateGuestId();
      // Verify item belongs to guest before deleting
      await prisma.cartItem.deleteMany({
        where: {
          id: Number(itemId),
          guestId,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// PATCH - Update item quantity
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    const { itemId, quantity } = await req.json();

    if (!itemId || quantity === undefined) {
      return NextResponse.json(
        { error: "Item ID and quantity are required" },
        { status: 400 },
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 },
      );
    }

    if (session?.user?.id) {
      const cartItem = await prisma.cartItem.updateMany({
        where: {
          id: itemId,
          userId: session.user.id,
        },
        data: { quantity },
      });
      return NextResponse.json(cartItem);
    } else {
      const guestId = await getOrCreateGuestId();
      const cartItem = await prisma.cartItem.updateMany({
        where: {
          id: itemId,
          guestId,
        },
        data: { quantity },
      });
      return NextResponse.json(cartItem);
    }
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
