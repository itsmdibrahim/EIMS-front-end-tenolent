/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "#0a0a0a",
        secondary: "#f4f4f5",
        tertiary: "#ffffff",
        "light-black": "#5f5f5f",
        danger: "#ff0000",
        "deep-danger": "#aa0000",
        "light-notify": "#0070f2",
        "theme-active": "#0fa",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
