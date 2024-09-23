/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@seatsavvy/eslint-config/server.js", "plugin:drizzle/recommended"],
  plugins: ["drizzle"],
  rules: {
    "drizzle/enforce-delete-with-where": "error",
    "drizzle/enforce-update-with-where": "error",
  },
};
