import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// Constants & Utilities
import { SITE_CONFIG } from '@/shared/constants/worlds'

// Components
import TopBar from '@/shared/components/layout/TopBar'
import BottomNav from '@/shared/components/layout/BottomNav'
import AuthProvider from '@/features/auth/components/AuthProvider'
import { ErrorBoundary } from '@/shared/components/feedback/ErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/**
 * Modern Viewport Configuration
 * Prevents unwanted zooming on mobile inputs and sets system bar colors.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

/**
 * Global Metadata
 * Linked to SITE_CONFIG for centralized SEO management.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: SITE_CONFIG.name,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning className='scroll-smooth'>
      <body
        className={`
          ${inter.variable} font-sans min-h-screen flex flex-col 
          bg-canvas text-primary antialiased 
          selection:bg-kyn-green-500 selection:text-white
        `}
      >
        <AuthProvider>
          {/* Global Header */}
          <TopBar />

          {/* Main Content Area: Constrained to Mobile-First Max Width */}
          <main className='relative mx-auto w-full max-w-md flex-grow pb-24 pt-16'>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>

          {/* Persistent Navigation */}
          <BottomNav />
        </AuthProvider>

        {/* Lemon Squeezy Integration */}
        <Script
          src='https://app.lemonsqueezy.com/js/lemon.js'
          strategy='lazyOnload'
        />
      </body>
    </html>
  )
}
