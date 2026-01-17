import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Softened Onyx for better readability
        "primary-text": "#1A1C1E", 

        // HOME / DEFAULT
        "home-base": "#CFEAFF",
        "home-surface": "#F7FAFF",
        "home-accent": "#8FB7FF",

        // TOOLS WORLD (Violet)
        "tools-base": "#F5F7FA",
        "tools-surface": "#FFFFFF",
        "tools-accent": "#A88BFF", 

        // LIFE WORLD (Green)
        "life-base": "#E4FFF5",
        "life-surface": "#FFFFFF",
        "life-accent": "#8ED9A1", 

        // HOME WORLD (Category - Peach)
        "cat-home-base": "#F7FAFF", 
        "cat-home-surface": "#FFFFFF",
        "cat-home-accent": "#FFCEB8", 

        "account-base": "#F3E7D6",
        "account-surface": "#FFFFFF",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
      },
      borderRadius: {
        'btn': '100px',
        'card': '48px', // Increased to match the refined Navbar/Cart UI
      },
      boxShadow: {
        // Enhanced Glassmorphism: Lighter, more diffuse
        'glass': '0 4px 40px -10px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'inner-glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Adds better custom scrollbar support for mobile
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
