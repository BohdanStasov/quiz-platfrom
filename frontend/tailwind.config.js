/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        xxs: "375px",
        xs: "425px",
        ss: "620px",
        sm: "768px",
        md: "1024px",
        lg: "1440px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
};

