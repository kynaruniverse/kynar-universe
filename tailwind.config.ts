import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /(hover:)?bg-(brand-accent|accent-thermal|accent-lavender)(\/30)?/,
    },
    {
      pattern: /text-(brand-accent|accent-thermal|accent-lavender)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        "brand-base": "var(--brand-base)",
        "brand-text": "var(--brand-text)",
        "brand-surface": "var(--brand-surface)",
        "brand-accent": "var(--brand-accent)",
        "accent-thermal": "var(--accent-thermal)",
        "accent-lavender": "var(--accent-lavender)",
        "color-success": "var(--color-success)",
        "color-warning": "var(--color-warning)",
        "color-info": "var(--color-info)",
        "color-muted": "var(--color-muted)",
        "color-disabled": "var(--color-disabled)",
        "color-border": "var(--color-border)",
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '32px',
        inner: '20px',
        btn: '100px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      boxShadow: {
        tactile: '0 4px 30px -4px rgba(0, 0, 0, 0.03), 0 2px 12px -2px rgba(0, 0, 0, 0.02)',
        'tactile-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 12px 24px -4px rgba(0, 0, 0, 0.03)',
      },
      transitionDuration: {
        fast: '300ms',
        base: '500ms',
        slow: '800ms',
        liquid: '1200ms',
        glacial: '2000ms',
      },
      animation: {
        'anim-fade-in': 'fadeIn 1s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'anim-reveal': 'reveal 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
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
    typography,
    scrollbar,
  ],
};

export default config;