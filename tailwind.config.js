/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#009B63',
        'beige': '#F0E1D5'
      },
      animation: {
        'spin-slow': 'spin 1.8s linear infinite',
      }
    },
  },
  plugins: [],
}

