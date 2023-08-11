/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        'covered-by-your-grace': ['Covered By Your Grace', 'cursive'],
      },
      fontSize: {
        xs: '0.8125rem'
      },
      colors: {
        gray: {
          50: '#f8f7fa',
          100: '#eeedf0',
          700: '#a3a3a3',
          900: '#19181a'
        }
      },
      boxShadow: {
        lg: '0px 1px 3px 0px rgba(19, 10, 46, 0.13), 0px 3px 14px 0px rgba(19, 10, 46, 0.03), 0px 8px 32px 0px rgba(19, 10, 46, 0.07), 0px 30px 84px 0px rgba(19, 10, 46, 0.08)'
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}