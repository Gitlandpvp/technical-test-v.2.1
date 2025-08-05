/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f8e0',
          100: '#eef1c7',
          200: '#dde3a0',
          300: '#c8d175',
          400: '#b3bf4a',
          500: '#9eac2f',
          600: '#8a9924',
          700: '#76861a',
          800: '#627310',
          900: '#4e6006',
        },
        background: {
          DEFAULT: '#27292d',
          light: '#2f3135',
          dark: '#1f2125',
        },
        text: {
          DEFAULT: '#cddc39',
          light: '#d4e34a',
          dark: '#b8c72a',
          muted: '#a0ae20',
        },
        accent: {
          DEFAULT: '#cddc39',
          light: '#d4e34a',
          dark: '#b8c72a',
        }
      },
    },
  },
  plugins: [],
} 