import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { PrismaClient as AdapterPrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import prisma from "./prisma";

const adapter = PrismaAdapter(prisma as unknown as AdapterPrismaClient);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [Google],
  basePath: "/api/auth",
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user }) {
      try {
        const userId = user.id;
        const cookieStore = await cookies();
        const guestId = cookieStore.get("guestId")?.value;

        if (!userId || !guestId) return true;

        const guestCartItems = await prisma.cartItem.findMany({
          where: { guestId },
        });

        if (guestCartItems.length === 0) {
          cookieStore.delete("guestId");
          return true;
        }

        for (const guestItem of guestCartItems) {
          const existingUserItem = await prisma.cartItem.findFirst({
            where: {
              userId,
              productId: guestItem.productId,
            },
          });

          if (existingUserItem) {
            await prisma.cartItem.update({
              where: { id: existingUserItem.id },
              data: {
                quantity: existingUserItem.quantity + guestItem.quantity,
              },
            });
            await prisma.cartItem.delete({
              where: { id: guestItem.id },
            });
          } else {
            await prisma.cartItem.update({
              where: { id: guestItem.id },
              data: {
                guestId: null,
                userId,
              },
            });
          }
        }

        revalidateTag(`cart-${userId}`, "max");
        cookieStore.delete("guestId");
        return true;
      } catch (error) {
        console.error("Error merging cart:", error);
        return true;
      }
    },
  },
});
