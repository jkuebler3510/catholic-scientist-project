import baseConfig from "@catholic-scientists/config/eslint";

/**
 * Extended ESLint flat config for Next.js app.
 * Layers Next.js-specific rules on top of the shared config.
 */
export default [
  ...baseConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
