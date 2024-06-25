/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      animation: {
        fadeouttopleft: 'fade-out-top-left 0.5s ease-out 0s 1',
        fadeouttopright: 'fade-out-top-right 0.5s ease-out 0s 1 forwards',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"',...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
