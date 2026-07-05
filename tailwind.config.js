/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './apps/web/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/mobile/**/*.{js,jsx,ts,tsx}',
    './packages/core/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-lime': '#CCFF00',
        'sunset-orange': '#FF6B35',
      },
    },
  },
  plugins: [],
}
