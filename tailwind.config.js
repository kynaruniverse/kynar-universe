/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy-Cosmic Palette
        kyn: {
          green: { // Forest Green (Grounding/Trust)
            50: '#F0FDF4',
            500: '#2D5A3E',
            700: '#15803D',
          },
          caramel: { // Soft Caramel (Warmth/Focus)
            500: '#D4A574',
          },
          slate: { // Cool Slate (Structure)
            500: '#64748B',
            900: '#1E293B',
          },
          mist: '#FAF9F6', // No pure white
        },
      },
      fontFamily: {
        // Assuming a clean, streetwear-inspired sans-serif
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
