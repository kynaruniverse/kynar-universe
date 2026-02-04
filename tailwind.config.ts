import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // System Core: Driven by HSL variables in globals.css
        canvas: "hsl(var(--canvas) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
   
        "text-primary": "hsl(var(--text-primary) / <alpha-value>)",
        "text-secondary": "hsl(var(--text-secondary) / <alpha-value>)",

        // Branding: Unified Intelligence Palette
        kyn: {
          green: {
            50: "#F2F4F2",
            100: "#E6EAE5",
            200: "#C2CCC1",
          
            500: "hsl(var(--kyn-green) / <alpha-value>)", // Linked to CSS Var
            600: "#3D5140",
            700: "#2D3B2F",
            900: "#1A241B",
          },
          caramel: {
            50: "#FDFBF7",
            100: "#F7F1E6",
    
            200: "#E9DCC2",
            500: "hsl(var(--kyn-caramel) / <alpha-value>)", // Linked to CSS Var
            600: "#947234",
            700: "#755B29",
            900: "#453518",
          },
          slate: {
           
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            800: "#1E293B",
            900: "hsl(var(--kyn-slate) / <alpha-value>)", // Linked to CSS Var
          },
        },
      },
      fontFamily: {
        brand: ["var(--font-brand)", "Plus Jakarta Sans", "sans-serif"],
        ui: ["var(--font-ui)", "Inter", "sans-serif"],
      },
      spacing: {
        gutter: "1.5rem",
        inner: "1.25rem",
        section: "5rem",
     
      },
      borderRadius: {
        kynar: "1.25rem",
        "kynar-lg": "2rem",
        "kynar-xl": "2.5rem", // For Portals/Drawers
      },
      boxShadow: {
        "kynar-soft": "0 10px 40px -15px rgba(0, 0, 0, 0.08)",
        "kynar-deep": "0 20px 60px -12px rgba(0, 0, 0, 0.15)",
      },
      transitionTimingFunction: {
    
        "kyn-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in": "fade-in 0.6s var(--ease-kyn-out) fill-mode-both",
        "slide-up": "slide-up 0.8s var(--ease-kyn-out) fill-mode-both",
        "breathe": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
    
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(1.5rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};
export default config;
