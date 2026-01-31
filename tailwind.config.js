/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dynamic CSS Variable Mapping (Design System Section 3)
        canvas: 'hsl(var(--canvas) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'text-primary': 'hsl(var(--text-primary) / <alpha-value>)',
        'text-secondary': 'hsl(var(--text-secondary) / <alpha-value>)',

        kyn: {
          green: {
            50: '#F2F4F2', 100: '#E6EAE5', 200: '#C2CCC1', 500: '#4A614D', 600: '#3D5140', 700: '#2D3B2F', 900: '#1A241B',
          },
          caramel: {
            50: '#FDFBF7', 100: '#F7F1E6', 200: '#E9DCC2', 500: '#B68D40', 600: '#947234', 700: '#755B29', 900: '#453518',
          },
          blue: { // Tools World - Deep Cosmic Blue
            50: '#F5F7FA', 100: '#EBEFF5', 200: '#D1DBE8', 500: '#4A6D9C', 600: '#3D5980', 700: '#2F4563', 900: '#1B2838',
          },
          slate: { // Neutral Atmosphere
            50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B', 800: '#1E293B', 900: '#0F172A',
          }
        },
      },
      fontFamily: {
        brand: ["var(--font-brand)", "Plus Jakarta Sans", "sans-serif"],
        ui: ["var(--font-ui)", "Inter", "sans-serif"],
      },
      spacing: {
        'gutter': '1.5rem',  // Consistent 24px edge for mobile-first comfort
        'inner': '1.25rem',  // Component internal breathing room
        'section': '5rem',   // Grounded vertical rhythm
      },
      borderRadius: {
        'kynar': '1rem',     // 16px - Foundational soft corner
        'kynar-lg': '1.5rem', // 24px - For major cards and overlays
      },
      boxShadow: {
        'kynar-soft': '0 2px 15px rgba(0, 0, 0, 0.02)',
        'kynar-elevated': '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'kyn-out': 'cubic-bezier(0.16, 1, 0.3, 1)', // Grounded Ease-Out
      },
      animation: {
        'fade-in': 'fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"), // Recommended for cleaner entry animations
  ],
};
