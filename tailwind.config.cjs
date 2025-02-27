/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}',
  // "./node_modules/tw-elements/dist/js/**/*.js"
],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
}
