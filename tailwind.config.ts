import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: "#FDF5F4",
          100: "#FCE9E7",
          200: "#F9D3CE",
          300: "#F4B3AB",
          400: "#EC8A7D",
          500: "#D87163",
          600: "#C85A4D",
          700: "#A8483D",
          800: "#8A3D35",
          900: "#73362F",
        },
      },
    },
  },
  plugins: [],
};

export default config;
