import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        home: {
          base: '#CFEAFF',    
          dark: '#A5CFEA',
          surface: '#F7FAFF',
          text: '#2A2D32',    
          accent: '#8FB7FF',
        },
        tools: {
          base: '#F5F7FA',
          surface: '#FFFFFF',
          text: '#2A2D32',
          accent: '#A88BFF', 
        },
        life: {
          base: '#E4FFF5',
          surface: '#FFFFFF',
          text: '#2D7A4D',
          accent: '#8ED9A1', 
        },
        signal: {
          cyan: '#1ACBFF',    
          green: '#8ED9A1',
          yellow: '#FFE900',
          red: '#FF3A5C',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], 
        serif: ['Lora', 'serif'],       
      },
      fontSize: {
        'h1-mob': ['28px', '1.2'], 
        'h1-desk': ['36px', '1.2'],
        'body': ['18px', '1.6'],   
      }
    },
  },
  plugins: [],
};
export default config;
