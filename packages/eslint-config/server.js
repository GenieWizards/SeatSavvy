const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "unused-imports",
    "simple-import-sort",
    "import",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        endOfLine: "auto",
        printWidth: 80,
        tabWidth: 2,
        semi: true,
      },
    ],
    "no-console": "warn",
    "no-undef": "off",
    "consistent-return": "off",
    "jest/expect-expect": "off",
    "security/detect-object-injection": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/no-unresolved": "off",
    // "unused-imports/no-unused-imports": "error",
    // "unused-imports/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
