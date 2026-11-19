/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2fbf6',
          100: '#e1f7ea',
          200: '#c5eed7',
          300: '#97deb9',
          400: '#62c595',
          500: '#38a875',
          600: '#2b885e',
          700: '#246c4d',
          800: '#20563f',
          900: '#1b4332',
          950: '#0b261b',
        },
        sage: {
          50: '#f6f7f5',
          100: '#eaece6',
          200: '#d5d9ce',
          300: '#b7bfad',
          400: '#97a28a',
          500: '#7c886e',
          600: '#616c56',
          700: '#4d5545',
          800: '#3f4539',
          900: '#353a31',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
