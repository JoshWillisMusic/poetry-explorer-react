const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // Define a custom font utility class, e.g., 'font-libre'
        libre: ['"Libre Baskerville"', "serif"],
        // You can also override the default serif font
        serif: ['"Libre Baskerville"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
