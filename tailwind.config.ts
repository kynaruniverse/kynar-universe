import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // TYPOGRAPHY SYSTEM
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"], // Primary
        serif: ["var(--font-lora)", "serif"],       // Secondary
      },
      // COLOR SYSTEM
      colors: {
        // Universal
        "primary-text": "#2A2D32",
        
        // SECTION: HOME
        "home-base": "#CFEAFF", 
        "home-surface": "#F7FAFF",
        "home-accent": "#8FB7FF",
        
        // SECTION: TOOLS
        "tools-base": "#F5F7FA",
        "tools-surface": "#F5F7FA",
        "tools-accent": "#A88BFF", // Violet
        
        // SECTION: LIFE
        "life-base": "#E4FFF5",
        "life-surface": "#E4FFF5",
        "life-accent": "#8ED9A1", // Green
        
        // SECTION: HOME (CATEGORY)
        "cat-home-base": "#F7FAFF",
        "cat-home-surface": "#F7FAFF",
        "cat-home-accent": "#FFCEB8", // Soft Peach
        
        // SECTION: ACCOUNT
        "account-base": "#F3E7D6",
        "account-surface": "#F3E7D6",
      },
      // SPACING SCALE
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      // BORDER RADIUS
      borderRadius: {
        'card': '12px',
        'btn': '6px',
      }
    },
  },
  plugins: [],
};
export default config;
