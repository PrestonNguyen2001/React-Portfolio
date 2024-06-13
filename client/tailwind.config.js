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
          background: "#0d1117",
          text: "#c9d1d9",
          primary: "#58a6ff",
          secondary: "#1f6feb",
          accent: "#8b949e",
        },
        light: {
          background: "#f0f6fc",
          text: "#24292e",
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
