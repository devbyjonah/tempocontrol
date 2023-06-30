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
        accent: {
          DEFAULT: "#126887",
          dark: "#0a3b4b",
        },
        background: {
          DEFAULT: "#181818",
          dark: "#111111",
          transparent: "rgba(0, 0, 0, 0.75)",
        },
        gradient: {
          DEFAULT: "linear-gradient(90deg, #12876c 0%, #126887 100%)",
          dark: "linear-gradient(90deg, #0a3b4b 0%, #126887 100%)",
        },
      },
    },
    boxShadow: {
      primary: "0 20px 80px -10px rgba(18, 135, 108, 0.6)",
      secondary: "0 20px 80px -10px #f6fcfe",
    },
  },
  plugins: [],
};
