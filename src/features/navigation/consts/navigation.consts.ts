const NAVIGATION_LINKS = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Popular",
    href: "/popular",
  },

  {
    label: "Contact",
    href: "/contact",
  },
] as const;

const ALL_LINKS = [
  ...NAVIGATION_LINKS,
  { label: "Cart", href: "/cart" },
  { label: "Whitelist", href: "/whitelist" },
  { label: "Account setting", href: "/account/setting" },
  { label: "Add Product", href: "/account/addProduct" },
  { label: "Manage Products", href: "/account/manageProducts" },
  { label: "Login", href: "/login" },
  { label: "Product", href: "/shop/36" },
  { label: "Not Found", href: "/not-found" },
] as const;

const NAVIGATION_SHRINK_THRESHOLD = 0.9;

export { NAVIGATION_LINKS, ALL_LINKS, NAVIGATION_SHRINK_THRESHOLD };
