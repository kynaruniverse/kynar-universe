import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // 1. SAFELIST: Ensures dynamic hover and background classes are always generated
  safelist: [
    'hover:bg-brand-accent',
    'hover:bg-accent-lavender',
    'hover:bg-accent-thermal',
    'bg-brand-accent',
    'bg-accent-lavender',
    'bg-accent-thermal',
    'bg-brand-accent/30',
    'bg-accent-lavender/30',
    'bg-accent-thermal/30',
    'text-brand-accent',
    'text-accent-lavender',
    'text-accent-thermal',
  ],
  theme: {
    extend: {
      colors: {
        // CURATED OPENNESS PALETTE: Soft, welcoming, and high-contrast
        "brand-base": "#FBFBF9",  // Even softer paper-white
        "brand-text": "#1A1A1A",  // Deep near-black for readability
        "brand-surface": "#F2F0ED", // Subtle off-white for sections
        "brand-accent": "#2D3B2E", // Deep forest for grounding
        "accent-thermal": "#C46B5B", // Muted terracotta
        "accent-lavender": "#867E9C", // Dusty lavender
  
        // SEMANTIC TOKENS
        "color-success": "#2D3B2E",
        "color-warning": "#C46B5B",
        "color-info": "#867E9C",
        "color-muted": "#666666",
        "color-disabled": "#E5E5E5",
        "color-border": "#EEEEEE",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '32px',
        'inner': '20px',
        'btn': '100px',
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
      },
      boxShadow: {
        'tactile': '0 4px 30px -4px rgba(0, 0, 0, 0.03), 0 2px 12px -2px rgba(0, 0, 0, 0.02)',
        'tactile-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 12px 24px -4px rgba(0, 0, 0, 0.03)',
      },
      transitionDuration: {
        'fast': '300ms',
        'base': '500ms',
        'slow': '800ms',
        'liquid': '1200ms',
        'glacial': '2000ms',
      },
      animation: {
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
