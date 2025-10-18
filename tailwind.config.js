import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#FAFAFA",
        primary:'var(--primary)' 
      },
       fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
}