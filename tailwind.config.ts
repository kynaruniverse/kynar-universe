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
  ],
  theme: {
    extend: {
      colors: {
        // CORE BRAND PALETTE
        "brand-base": "#F5F2F0",  
        "brand-text": "#1C1C1C",  
        "brand-surface": "#D7C4B7",
        "brand-accent": "#4A5D4E",
        "accent-thermal": "#D97E6E", 
        "accent-lavender": "#9B94B0",
  
        // SEMANTIC TOKENS
        "color-success": "var(--color-success)",
        "color-warning": "var(--color-warning)",
        "color-info": "var(--color-info)",
        "color-muted": "var(--color-muted)",
        "color-disabled": "var(--color-disabled)",
        "color-border": "var(--color-border)",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'card': '40px',
        'inner': '28px',
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
