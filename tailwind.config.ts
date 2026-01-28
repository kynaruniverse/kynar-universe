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
          // The "Warm Canvas" - Earthy and approachable background
          canvas: '#FAF9F6',
          
          // Home World - Signature Forest Greens (Primary Brand Action)
          // Aligned with Colour Guide 2.1
          green: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#2D5A3E', // Authoritative Brand Anchor
            600: '#16A34A', 
            700: '#15803D', // Hover states
            800: '#166534',
            900: '#14532D',
          },
          
          // Lifestyle World - Earthy Caramels
          caramel: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            500: '#D4A574', // Lifestyle Primary
            600: '#B48A5F',
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
        'kyn': '2.5rem', // Signature "Universe" organic curve
      },
      boxShadow: {
        // Visual Guide 11.1: Branded elevation
        'kyn-lift': '0 20px 40px -15px rgba(45, 90, 62, 0.15)', 
        'kyn-caramel': '0 20px 40px -15px rgba(212, 165, 116, 0.15)',
        'kyn-glow': '0 0 20px -5px rgba(34, 197, 94, 0.3)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'subtle-lift': 'lift 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-8px)' },
        }
      },
      typography: {
        // Alignment with Brand Strategy 3.1: Editorial Content
        DEFAULT: {
          css: {
            color: '#475569',
            h1: { 
              fontWeight: '900', 
              letterSpacing: '-0.05em', 
              color: '#0F172A',
              textTransform: 'uppercase'
            },
            h2: { 
              fontWeight: '800', 
              letterSpacing: '-0.025em', 
              color: '#1E293B' 
            },
            blockquote: { 
              fontStyle: 'italic', 
              color: '#16A34A',
              borderLeftColor: '#22C55E',
              fontWeight: '600'
            },
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
