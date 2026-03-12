export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: [
    "/account/settings",
    "/account/addProduct",
    "/account/manageProducts",
  ],
};
