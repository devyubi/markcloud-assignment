/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans', 'Noto Sans KR', 'Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
      },
    },
  },
  plugins: [],
} satisfies Config