/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
      },
      animation: {
        "border-animation": "borderMove 2s linear infinite",
      },
      keyframes: {
        borderMove: {
          "0%": { borderColor: "red" },
          "25%": { borderColor: "blue" },
          "50%": { borderColor: "green" },
          "75%": { borderColor: "yellow" },
          "100%": { borderColor: "red" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // Enable light and dark themes
  },
};
