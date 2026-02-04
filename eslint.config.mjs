import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["registry/components/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "import/no-unresolved": "off",
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unknown-property": "off",
    },
  },
]);

export default eslintConfig;
