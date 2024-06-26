/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "7/10": "7 / 10",
      },
    },
  },
  plugins: [],
};
