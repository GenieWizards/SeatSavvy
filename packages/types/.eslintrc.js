/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@seatsavvy/eslint-config/server.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-unused-vars": "off",
  },
};
