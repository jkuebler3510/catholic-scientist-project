import baseConfig from "./packages/config/eslint.config.js";

export default [
  ...baseConfig,
  {
    ignores: [".claude/**", ".husky/**"],
  },
];
