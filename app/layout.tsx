import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Suspense } from 'react';

// CONTEXT PROVIDERS & GLOBAL COMPONENTS
// ✅ FIX 1: Imported the single unified AppProvider
import { AppProvider } from '../context/AppProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import SuccessToastWrapper from '../components/SuccessToastWrapper';
import LiquidCursor from '../components/LiquidCursor';

// TYPOGRAPHY
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

// METADATA
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
    // ✅ FIX 2: Matches 'public/opengraph-image.png'
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kynar',
    description: 'Premium digital tools, curated and trusted.',
    // ✅ FIX 3: Matches 'public/opengraph-image.png'
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    // ✅ FIX 4: Matches 'public/apple-touch-icon.png'
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-body selection:bg-brand-accent/10 antialiased">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-text focus:text-white focus:rounded-full"
        >
          Skip to content
        </a>

        {/* GLOBAL PROVIDER WRAPPER */}
        {/* ✅ FIX 5: Single Provider wrapping the entire app */}
        <AppProvider>
            {/* UI Initialization */}
            <PageLoader />

            {/* Interactive cursor */}
            <LiquidCursor />

            {/* Main layout */}
            <div className="flex flex-col min-h-screen">
              {/* Navbar wrapped in Suspense for static rendering */}
              <Suspense fallback={<div className="h-24 w-full bg-brand-surface animate-pulse" />}>
                <Navbar />
              </Suspense>

              {/* Primary content */}
              <main id="main-content" className="flex-grow">
                {children}
              </main>

              <Footer />
            </div>

            {/* Global notifications */}
            <SuccessToastWrapper />
        </AppProvider>
      </body>
    </html>
  );
}
