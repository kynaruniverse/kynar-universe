import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kyn: {
          // The "Warm Canvas" - Earthy and approachable
          canvas: '#FAF9F6',
          
          // Home World - Signature Forest Greens
          green: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            400: '#4ADE80',
            500: '#22C55E', // Main Action
            600: '#16A34A', // Hover
            900: '#14532D',
          },
          
          // Lifestyle World - Earthy Caramels
          caramel: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            500: '#D4A574', // Lifestyle Primary
            900: '#78350F',
          },
          
          // Tools World - Industrial Slates
          slate: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B', // Neutral Anchor
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A', // Dark Mode Canvas
            950: '#020617',
          }
        }
      },
      borderRadius: {
        'kyn': '2.5rem', // Signature rounded corner across all 26 files
      },
      boxShadow: {
        // High-end lift used in ProductCards and the Vault
        'kyn-lift': '0 20px 40px -12px rgba(15, 23, 42, 0.08)',
        'kyn-glow': '0 0 20px -5px rgba(34, 197, 94, 0.2)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      typography: {
        // Customizing File 25's editorial content
        DEFAULT: {
          css: {
            color: '#475569', // kyn-slate-600
            h1: { fontWeight: '900', letterSpacing: '-0.05em' },
            h2: { fontWeight: '900', letterSpacing: '-0.025em' },
            blockquote: { fontStyle: 'italic', color: '#16A34A' }, // kyn-green-600
          }
        }
      }
    },
  },
  // Typography plugin is REQUIRED for your [slug]/page.tsx
  plugins: [require('@tailwindcss/typography')],
};

export default config;
