/** @type {import("tailwindcss").Config}
 * /Users/nishanksoni/Projects/cibilthikkare/tailwind.config.js
 */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  // Tailwind v4 no longer supports theme.extend for colors
  theme: {},

  plugins: [
    require("@tailwindcss/typography"),
  ],
};
