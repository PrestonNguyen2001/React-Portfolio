/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: "black", // Dark background color
          text: "#c9d1d9", // Light text color for dark mode
          primary: "#58a6ff",
          secondary: "#1f6feb",
          accent: "#8b949e",
        },
        light: {
          background: "#f0f6fc", // Light background color
          text: "#24292e", // Dark text color for light mode
          primary: "#0366d6",
          secondary: "#005cc5",
          accent: "#586069",
        },
      },
      boxShadow: {
        glow: "0 0 10px 2px rgba(173, 216, 230, 0.5)",
        "glow-hover": "0 0 20px 4px rgba(173, 216, 230, 1)",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
