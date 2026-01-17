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
        // 1. PRIMARY TEXT (The Anchor)
        "primary-text": "#2A2D32", 

        // 2. HOME (Landing / Default) - Airy Blue
        "home-base": "#CFEAFF",
        "home-surface": "#F7FAFF",
        "home-accent": "#8FB7FF",

        // 3. TOOLS WORLD - Technical Violet
        "tools-base": "#F5F7FA",
        "tools-surface": "#FFFFFF",
        "tools-accent": "#A88BFF", // Violet

        // 4. LIFE WORLD - Organic Green
        "life-base": "#E4FFF5",
        "life-surface": "#FFFFFF",
        "life-accent": "#8ED9A1", // Green

        // 5. HOME WORLD (Category) - Cozy Peach
        "cat-home-base": "#F7FAFF", // Warm/Cozy
        "cat-home-surface": "#FFFFFF",
        "cat-home-accent": "#FFCEB8", // Soft Peach

        // 6. ACCOUNT - Warm Sand
        "account-base": "#F3E7D6",
        "account-surface": "#FFFFFF",
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      borderRadius: {
        'btn': '6px',
        'card': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
