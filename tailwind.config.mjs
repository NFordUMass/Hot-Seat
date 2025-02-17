/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {    gridTemplateColumns: {
    'auto-fit': 'repeat(auto-fit, minmax(3rem, 1fr))', // Adjust `3rem` if needed
  },
  },
  plugins: [require('@tailwindcss/typography')]
}