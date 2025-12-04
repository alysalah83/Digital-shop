export { auth as proxy } from "@/auth";

export const config = {
  matcher: [
    "/account/settings",
    "/account/addProduct",
    "/account/manageProducts",
  ],
};
