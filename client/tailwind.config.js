/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 10px 2px rgba(173, 216, 230, 0.5)", // Initial whitish cyan glow
        "glow-hover": "0 0 20px 4px rgba(173, 216, 230, 1)", // Brighter glow on hover
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
