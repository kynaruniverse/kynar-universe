import type { Metadata, Viewport } from "next";
import { Outfit, Lora } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LiquidCursor from "../components/LiquidCursor";
import PageLoader from "../components/PageLoader";
import SuccessToastWrapper from "../components/SuccessToastWrapper";
import { CartProvider } from "../context/CartContext";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const lora = Lora({ 
  subsets: ["latin"],
  variable: "--font-lora", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kynar Universe | One Universe. Infinite Solutions.",
  description: "A calm, modern digital space where everyday tools help you work, live, and learn with ease.",
};

// PREVENT ZOOMING ON MOBILE INPUTS (Premium UX)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL('https://kynar-universe-v1.netlify.app'),
  title: {
    default: 'Kynar Universe | One Universe. Infinite Solutions.',
    template: '%s | Kynar Universe',
  },
  description: 'Premium digital tools, guides, and resources for the modern journey.',
  openGraph: {
    title: 'Kynar Universe',
    description: 'Explore the digital tools of the future.',
    url: 'https://kynar-universe-v1.netlify.app',
    siteName: 'Kynar Universe',
    images: [
      {
        url: '/opengraph-image.png', // Points to public/opengraph-image.png
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kynar Universe',
    description: 'Premium digital tools for the modern journey.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-home-accent/30">
      <body className={`
        ${outfit.variable} ${lora.variable} 
        antialiased 
        bg-home-base 
        text-primary-text 
        flex flex-col min-h-screen 
        relative overflow-x-hidden
        transition-colors duration-1000 ease-in-out
      `}>
        <CartProvider>
          {/* 1. LAYER 1000: PRE-LOADER (Absolute Top) */}
          <PageLoader />
          
          {/* 2. LAYER 100: GLOBAL FEEDBACK */}
          <SuccessToastWrapper />
          
          {/* 3. LAYER 60: NAVIGATION */}
          <Navbar />
          
          {/* 4. LAYER 10: MAIN CONTENT SECTOR */}
          <main className="flex-grow relative z-10 flex flex-col">
            {children}
          </main>
          
          {/* 5. LAYER 5: ATMOSPHERIC BACKGROUND */}
          <LiquidCursor />
          
          {/* 6. LAYER 1: FOOTER */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
