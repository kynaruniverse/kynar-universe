import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

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
        canvas: "hsl(var(--canvas) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        "text-primary": "hsl(var(--text-primary) / <alpha-value>)",
        "text-secondary": "hsl(var(--text-secondary) / <alpha-value>)",
        kyn: {
          green: {
            50: "#F2F4F2",
            100: "#E6EAE5",
            200: "#C2CCC1",
            500: "hsl(var(--kyn-green) / <alpha-value>)",
            600: "#3D5140",
            700: "#2D3B2F",
            900: "#1A241B",
          },
          caramel: {
            50: "#FDFBF7",
            100: "#F7F1E6",
            200: "#E9DCC2",
            500: "hsl(var(--kyn-caramel) / <alpha-value>)",
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
            900: "hsl(var(--kyn-slate) / <alpha-value>)",
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
        'kynar-sm': "0.75rem",
        'kynar': "1.25rem",
        "kynar-lg": "2rem",
        "kynar-xl": "2.5rem",
      },
      boxShadow: {
        "kynar-soft": "0 10px 40px -15px rgba(0, 0, 0, 0.08)",
        "kynar-deep": "0 30px 70px -10px rgba(0, 0, 0, 0.2)",
        "kynar-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
      },
      transitionTimingFunction: {
        "kyn-drift": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "portal-in": "portal-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "portal-out": "portal-out 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "breathe": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "portal-in": {
          "0%": { transform: "scale(0.9) translateY(20px)", opacity: "0", filter: "blur(10px)" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1", filter: "blur(0)" },
        },
        "portal-out": {
          "0%": { transform: "scale(1) translateY(0)", opacity: "1" },
          "100%": { transform: "scale(0.95) translateY(10px)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    typography,
    forms,
    animate,
  ],
};

export default config;
