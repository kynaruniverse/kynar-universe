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
        // CORE BRAND PALETTE (60-30-10 Rule)
        "brand-base": "#F5F2F0",    // Primary Background
        "brand-text": "#1C1C1C",    // Primary Text
        
        // SURFACE & LAYERING
        "brand-surface": "#D7C4B7", // Secondary Background / Surfaces
        
        // ACTION & ACCENTS
        "brand-accent": "#4A5D4E",  // Primary Action Color
        
        // SUPPLEMENTARY ACCENTS
        "accent-thermal": "#D97E6E", // Warm Accent
        "accent-lavender": "#9B94B0", // Soft Accent
      },
      fontFamily: {
        // Primary Headings
        sans: ['var(--font-outfit)', 'sans-serif'],
        // UI and Body Copy
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        // Layout and Component Geometry
        'card': '40px',
        'inner': '28px',
        'btn': '100px',
      },
      boxShadow: {
        // Elevation and Depth Styles
        'tactile': '0 4px 30px -4px rgba(0, 0, 0, 0.03), 0 2px 12px -2px rgba(0, 0, 0, 0.02)',
        'tactile-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 12px 24px -4px rgba(0, 0, 0, 0.03)',
      },
      transitionDuration: {
        // Animation Timing Constants
        'slow': '800ms',
        'liquid': '1200ms',
      },
      animation: {
        // Component Transition Signals
        'fade-in': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'reveal': 'reveal 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};
export default config;
