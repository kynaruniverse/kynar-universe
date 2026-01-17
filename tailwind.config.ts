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
        "primary-text": "#2A2D32", 

        // HOME / DEFAULT
        "home-base": "#CFEAFF",
        "home-surface": "#F7FAFF",
        "home-accent": "#8FB7FF",

        // TOOLS WORLD
        "tools-base": "#F5F7FA",
        "tools-surface": "#FFFFFF",
        "tools-accent": "#A88BFF", 

        // LIFE WORLD
        "life-base": "#E4FFF5",
        "life-surface": "#FFFFFF",
        "life-accent": "#8ED9A1", 

        // HOME WORLD (Category)
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
        'btn': '100px', // Fully rounded buttons for premium feel
        'card': '32px', // Squarcle-style large corners
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
