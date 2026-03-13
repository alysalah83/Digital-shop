"use server";

import { cookies } from "next/headers";

export async function createGuest() {
  const id = crypto.randomUUID();
  const cookieStore = await cookies();

  cookieStore.set("guestId", id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
  });
  return id;
}
