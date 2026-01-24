/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fixed typo: sans-serif
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // --- Custom Brand Palette ---
        kyn: {
          green: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
            700: '#15803D',
            800: '#166534',
            900: '#14532D',
            950: '#0F2A13',
          },
          caramel: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
            950: '#451A03',
          },
          slate: {
            50: '#F8FAFC',
            100: '#E2E8F0',
            200: '#CBD5E1',
            300: '#94A3B8',
            400: '#64748B',
            500: '#475569',
            600: '#334155',
            700: '#1E293B',
            800: '#0F172A',
            900: '#020617',
            950: '#010413',
          },
        },

        // --- CSS Variable Mappings with Alpha Support ---
        // Using <alpha-value> allows you to use classes like bg-surface/50
        canvas: 'hsl(var(--canvas) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        primary: 'hsl(var(--text-primary) / <alpha-value>)', 
      },
      borderRadius: {
        // Adding custom large rounding to match your high-end app feel
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
