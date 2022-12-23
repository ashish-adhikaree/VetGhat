/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        postcard: "1fr 5fr 1fr 1fr",
        postcardwithcaption: "1fr 1fr 5fr 1fr 1fr",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
