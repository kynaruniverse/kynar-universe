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
        // PILLAR 1: CALM FOUNDATION (60-30-10 Rule)
        "brand-base": "#F5F2F0",    // Stone: Visual Foundation
        "brand-text": "#1C1C1C",    // Charcoal: Grounded Contrast
        
        // PILLAR 3: PHYSICAL DEPTH
        "brand-surface": "#D7C4B7", // Mocha: Tactile Layering
        
        // PILLAR 2: INTELLIGENCE REVEAL
        "brand-accent": "#4A5D4E",  // Verdant: Primary Action
        
        // Contextual Accents (Restrained & Sophisticated)
        "accent-thermal": "#D97E6E", // Thermal: Organic Warmth
        "accent-lavender": "#9B94B0", // Lavender: Soft Refinement
      },
      fontFamily: {
        // Muse Engine Typography: Humanist Medium for Headings
        sans: ['var(--font-outfit)', 'sans-serif'],
        // High x-height Sans for Body/UI
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        // Space is a luxury signal
        'card': '40px',
        'inner': '28px',
        'btn': '100px',
      },
      boxShadow: {
        // Physical Depth: Subtle occlusion of light
        'tactile': '0 4px 30px -4px rgba(0, 0, 0, 0.03), 0 2px 12px -2px rgba(0, 0, 0, 0.02)',
        'tactile-hover': '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 12px 24px -4px rgba(0, 0, 0, 0.03)',
      },
      transitionDuration: {
        // Liquid Motion: Unhurried and confident
        'slow': '800ms',
        'liquid': '1200ms',
      },
      animation: {
        // Intelligence on Demand: Reveal signals
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
