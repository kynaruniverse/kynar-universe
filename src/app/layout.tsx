import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Components
import TopBar from '@/shared/components/layout/TopBar';
import BottomNav from '@/shared/components/layout/BottomNav';
import AuthProvider from '@/features/auth/components/AuthProvider';
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Modern Viewport Configuration (Next.js 15 requirement)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://kynar-universev3.netlify.app'),
  title: {
    default: 'Kynar Universe | Digital Marketplace',
    template: '%s | Kynar Universe',
  },
  description: 'One universe, unlimited solutions. Organise your home, life, and projects with curated digital tools.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kynar',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`
          ${inter.variable} font-sans
          min-h-screen flex flex-col
          bg-slate-50 dark:bg-slate-950
          antialiased
          selection:bg-kyn-green-500 selection:text-white
        `}
      >
        {/* AuthProvider must wrap the entire tree to provide user context */}
        <AuthProvider>
          <TopBar />
          
          <main className="w-full max-w-md mx-auto flex-grow relative pt-16 pb-24">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>

          <BottomNav />
        </AuthProvider>

        {/* Lemon Squeezy Library for checkout overlays */}
        <Script
          src="https://app.lemonsqueezy.com/js/lemon.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
