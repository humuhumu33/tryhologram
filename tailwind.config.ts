import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "ct-draw": {
          from: { strokeDashoffset: "320" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "ct-draw": "ct-draw 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
