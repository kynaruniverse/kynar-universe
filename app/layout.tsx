/**
 * KYNAR UNIVERSE: Root Layout (v1.5)
 * Role: Global Atmosphere, Font Injection, and State Providers.
 * Aligned with: Design System Section 5 (Layout) & UX Canon Section 8.
 */

import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PresenceBar } from "@/components/layout/PresenceBar";
import { Footer } from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation"; // Sync with audited filename
import { getUserProfile } from "@/lib/supabase/helpers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-ui",
  display: 'swap',
});

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
  description: "A calm, mobile-first digital ecosystem for useful, well-designed tools to organise modern life.",
  metadataBase: new URL('https://kynaruniverse.com'),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // UX Canon: Prevents disruptive zoom on mobile inputs
  themeColor: "#FAF9F6", 
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side fetch for initial atmospheric state
  const profile = await getUserProfile();

  return (
    <html 
      lang="en-GB" 
      className={`${inter.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col font-ui bg-canvas text-text-primary antialiased selection:bg-kyn-green-100 selection:text-kyn-green-900">
        
        {/* TOAST SYSTEM: Grounded and Reassured Notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 5000,
            className: "border border-border rounded-xl font-brand text-sm shadow-sm p-4",
            success: {
              iconTheme: { primary: '#16a34a', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#dc2626', secondary: '#fff' },
            },
          }}
        />

        {/* ATMOSPHERIC TEXTURE: Design System Section 11 */}
        <div 
          className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.02] contrast-150" 
          aria-hidden="true"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* PERSISTENT UI ELEMENTS */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <PresenceBar initialProfile={profile} />
          
          <main className="flex-1 w-full pb-24 md:pb-0">
            {children}
          </main>

          <Footer />
        </div>

        {/* GLOBAL NAVIGATION: Handrail of the Universe */}
        <Navigation />

      </body>
    </html>
  );
}
