const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@seatsavvy/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
