import { OrderFeature } from "../types/main.types";

const ORDER_FEATURES = [
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
] as OrderFeature[];

const SLIDER_CARDS_COUNT = 3;
const DISCOUNT_CARDS_COUNT = 2;

const NEW_SECTION_PRODUCTS_COUNT = 8;

const BEST_OFFERS_MINI_CARDS = [
  {
    bgColor: "bg-sky-100",
    buttonColor: "bg-sky-600",
    buttonHoverColor: "hover:bg-sky-700",
  },
  {
    bgColor: "bg-yellow-100",
    buttonColor: "bg-yellow-600",
    buttonHoverColor: "hover:bg-yellow-700",
  },
];

const BEST_OFFERS_PRODUCTS_COUNT = 3;
const BEST_SELLERS_PRODUCTS_COUNT = 6;
const TESTiMONIALS_COUNT = 3;

export {
  ORDER_FEATURES,
  SLIDER_CARDS_COUNT,
  DISCOUNT_CARDS_COUNT,
  NEW_SECTION_PRODUCTS_COUNT,
  BEST_OFFERS_MINI_CARDS,
  BEST_OFFERS_PRODUCTS_COUNT,
  BEST_SELLERS_PRODUCTS_COUNT,
  TESTiMONIALS_COUNT,
};
