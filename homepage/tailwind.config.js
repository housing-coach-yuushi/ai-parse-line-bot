/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#06c656",
        "primary-dark": "#05a849",
        "background-light": "#f5f8f7",
        "background-dark": "#0f2317",
        "surface-light": "#ffffff",
        "surface-dark": "#162e21",
        "text-main-light": "#111814",
        "text-main-dark": "#f0f5f2",
        "text-sub-light": "#4a5950",
        "text-sub-dark": "#aebcb4",
        "border-light": "#dbe6df",
        "border-dark": "#2a4034",
      },
      fontFamily: {
        "display": ["Noto Sans JP", "Work Sans", "sans-serif"],
        "body": ["Noto Sans JP", "Work Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
