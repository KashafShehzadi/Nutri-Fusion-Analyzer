//** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myCustomColor: '#f57402',
        textColor:"White",
        lightBlack: "#343541",
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}

// 