const HERO_SLIDER_CARDS_COUNT = 3;
const HERO_DISCOUNT_CARDS_COUNT = 2;
const HERO_ORDER_FEATURE_ITEMS = [
  {
    icon: "rocket",
    title: "free shipping",
    label: "For all orders $200",
  },
  {
    icon: "loop",
    title: "1 & 1 returns",
    label: "Cancellation after 1 day",
  },
  {
    icon: "shield",
    title: "100% Secure Payments",
    label: "Guarantee secure payments",
  },
  {
    icon: "chat",
    title: "24/7 Dedicated Support",
    label: "Anywhere & anytime",
  },
] as const;

export {
  HERO_SLIDER_CARDS_COUNT,
  HERO_DISCOUNT_CARDS_COUNT,
  HERO_ORDER_FEATURE_ITEMS,
};
