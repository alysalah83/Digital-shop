// eslint.config.mjs
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "dist/**",
      "coverage/**",
      "**/*.min.js",
    ],
  },

  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
];
