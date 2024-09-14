/** @type {import('tailwindcss').Config} */

// We want each package to be responsible for its own content.
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  plugins: [],
};
