/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#e32d33',
        heading: '#a6161d',
        grayLight: '#f5f5f5',
        foreground: '#222222',
        background: '#f9f9f9',
      },
      fontFamily: {
        montreal: ['"Neue Montreal"', 'sans-serif'],
      },
      maxWidth: {
        container: '70rem',
      },
    },
  },
  plugins: [],
};
