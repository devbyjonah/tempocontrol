/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#12876c",
        secondary: "#f6fcfe",
        accent: "#126887",
      },
    },
    boxShadow: {
      DEFAULT: "0 20px 80px -10px #12876c",
    },
  },
  plugins: [],
};
