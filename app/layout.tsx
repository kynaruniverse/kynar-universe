/**
 * KYNAR UNIVERSE: Root Layout (v1.6)
 * Role: The master architectural frame.
 * Optimization: Next.js 15, Hardware-accelerated overlays, Mobile Safe-Zones.
 */

import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PresenceBar } from "@/components/layout/PresenceBar";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation"; // Refactored named import
import { getUserProfile } from "@/lib/supabase/helpers";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

// UI Font: For technical data and functional labels
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-ui",
  display: 'swap',
});

// Brand Font: For headlines and narrative storytelling
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-brand",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Kynar Universe',
    default: 'Kynar Universe | Home • Lifestyle • Tools',
  },
  description: "A calm, mobile-first digital ecosystem built for professional architecture.",
  metadataBase: new URL('https://kynaruniverse.com'),
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents iOS auto-zoom on form inputs
  viewportFit: 'cover', // Ensures content fills the screen behind notches
  themeColor: "#FAF9F6", 
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Next.js 15 Server-Side Identity Check
  let profile = null;
  try {
    profile = await getUserProfile();
  } catch (e) {
    // Graceful degradation for edge cases or build-time rendering
    console.warn("[Layout] Profile bridge skipped or unavailable.");
  }

  return (
    <html 
      lang="en-GB" 
      className={cn(
        inter.variable, 
        jakarta.variable, 
        "scroll-smooth antialiased"
      )}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-canvas font-ui text-text-primary overflow-x-hidden">
        
        {/* TOAST SYSTEM: Ergonomically centered for mobile alerts */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            className: 'font-brand font-bold text-xs uppercase tracking-widest',
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: '1.25rem',
              border: '1px solid rgba(0,0,0,0.05)',
              padding: '1rem 1.5rem',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
            },
          }}
        />

        {/* ATMOSPHERIC GRAIN: Optimized SVG with hardware acceleration */}
        <div 
          className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.02] will-change-transform" 
          aria-hidden="true"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />

        {/* PRIMARY CONTAINER */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Top Presence Indicator (Contextual Identity) */}
          <PresenceBar initialProfile={profile} />
          
          {/* Main Narrative Slot: pb-24 protects content from the Navigation Dock */}
          <main className="flex-1 w-full pb-32 md:pb-0">
            {children}
          </main>

          <Footer />
        </div>

        {/* Navigation Compass: Stays above the main flow */}
        <Navigation />

      </body>
    </html>
  );
}
