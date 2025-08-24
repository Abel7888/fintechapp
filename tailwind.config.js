/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#badeff',
          300: '#8fcaff',
          400: '#5db0ff',
          500: '#2b91ff',
          600: '#1775e6',
          700: '#145fbd',
          800: '#134f99',
          900: '#143f75',
        },
      },
    },
  },
  plugins: [],
}
