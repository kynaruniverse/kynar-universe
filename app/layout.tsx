import './globals.css';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

// 1. IMPORT PROVIDERS & COMPONENTS
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import SuccessToastWrapper from '../components/SuccessToastWrapper';
import LiquidCursor from '../components/LiquidCursor';

// Typography: Neutral Sans for Body UI (High x-height)
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
  metadataBase: new URL('https://kynaruniverse.co.uk'),
  title: {
    default: 'Kynar Muse | Quiet Luxury meets Intelligent Software',
    template: '%s | Kynar Muse',
  },
  description: 'Premium digital products, curated and trusted for the modern professional.',
  openGraph: {
    title: 'Kynar Muse Engine',
    description: 'Quiet luxury meets intelligent software.',
    url: 'https://kynaruniverse.co.uk',
    siteName: 'Kynar Muse',
    images: [{ url: '/og-premium.png', width: 1200, height: 630 }],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kynar Muse',
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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body selection:bg-brand-accent/20">
        {/* THE MUSE ENGINE ARCHITECTURE */}
        <CartProvider>
          {/* Subtle Intelligence: Only reveals on intent/load */}
          <PageLoader />
          
          {/* Physical Depth: Liquid Cursor provides 'Motion > Decoration' */}
          <LiquidCursor />
          
          {/* Calm Foundation Interface */}
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* Main Content Area: Space is a luxury signal */}
            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />
          </div>
          
          {/* Global UI Signals */}
          <SuccessToastWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
