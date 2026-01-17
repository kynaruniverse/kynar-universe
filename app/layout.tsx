import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// 1. IMPORT PROVIDERS & COMPONENTS
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import SuccessToastWrapper from '../components/SuccessToastWrapper';
import LiquidCursor from '../components/LiquidCursor';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
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
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
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
    <html lang="en">
      <body className={inter.className}>
        {/* 2. WRAP THE UNIVERSE IN THE CART PROVIDER */}
        <CartProvider>
          {/* Atmospheric Elements */}
          <PageLoader />
          <LiquidCursor />
          
          {/* Main Interface */}
          <Navbar />
          
          {/* The Page Content */}
          {children}
          
          {/* Global UI Signals */}
          <SuccessToastWrapper />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
