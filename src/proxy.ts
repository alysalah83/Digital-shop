export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: [
    "/checkout",
    "/account/settings",
    "/account/addProduct",
    "/account/manageProducts",
  ],
};
