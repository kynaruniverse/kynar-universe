import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Suspense } from 'react'; // <--- 1. IMPORT SUSPENSE

// 1. PROVIDERS & GLOBAL COMPONENTS
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import SuccessToastWrapper from '../components/SuccessToastWrapper';
import LiquidCursor from '../components/LiquidCursor';
import { AuthProvider } from '../context/AuthContext';

// Typography: Neutral Sans for Body UI
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Typography: Humanist Soft Grotesk for Headings
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kynaruniverse.co.uk'), 
  title: {
    default: 'Kynar | Premium Digital Products & Solutions',
    template: '%s | Kynar',
  },
  description: 'Premium digital products, curated and trusted for the modern professional.',
  openGraph: {
    title: 'Kynar Digital Store',
    description: 'Premium digital products and solutions.',
    url: 'https://kynaruniverse.co.uk',
    siteName: 'Kynar',
    images: [{ url: '/og-premium.png', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kynar',
    description: 'Premium digital tools, curated and trusted.',
    images: ['/og-premium.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-body selection:bg-brand-accent/10 antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-text focus:text-white focus:rounded-full">
          Skip to content
        </a>
        {/* GLOBAL APPLICATION WRAPPER */}
        <CartProvider>
          <AuthProvider>
            {/* UI Initialization */}
          <PageLoader />
          
          {/* Visual Refinement: Interactive Cursor */}
          <LiquidCursor />
          
          {/* Main Layout Structure */}
          <div className="flex flex-col min-h-screen">
            
            {/* 2. WRAP NAVBAR IN SUSPENSE */}
            {/* This isolates the useSearchParams hook so the rest of the page can build statically */}
            <Suspense fallback={<div className="h-24 w-full bg-transparent" />}>
              <Navbar />
            </Suspense>
            
            {/* Primary Page Content */}
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            
            <Footer />
          </div>
          
          {/* Notification System */}
          <SuccessToastWrapper />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
