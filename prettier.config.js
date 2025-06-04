//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  jsxSingleQuote: false,
  endOfLine: "lf",
  semi: true,
  trailingComma: "es5",
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrderCaseSensitive: true,
  importOrder: [
    "^(react|react-dom)(/.+)?$",
    "^(@tanstack/)(/.+)?$",
    "^(@?react-).+",
    "<THIRD_PARTY_MODULES>", // third party modules
    "",
    "<TYPES>",
    "^(@/|~/)", // local modules (starting with @/ or ~/)
    "",
    "^[./]", // relative imports
  ],
};

export default config;
