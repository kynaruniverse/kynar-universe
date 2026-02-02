import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PresenceBar } from "@/components/layout/PresenceBar";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation"; 
import { getUserProfile } from "@/lib/supabase/helpers";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-ui", display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-brand", display: 'swap' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents accidental zoom on mobile inputs
  viewportFit: 'cover', // Critical for safe-area-insets
  themeColor: '#FAF9F6',
};

export const metadata: Metadata = {
  title: {
    template: '%s | Kynar Universe',
    default: 'Kynar Universe | Home • Lifestyle • Tools',
  },
  description: "A calm, mobile-first digital ecosystem.",
  metadataBase: new URL('https://kynaruniverse.com'),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-side identity fetch
  const profile = await getUserProfile();

  return (
    <html lang="en" className={cn(inter.variable, jakarta.variable, "antialiased")}>
      <body className="bg-canvas text-text-primary selection:bg-kyn-green/10">
        <Toaster position="bottom-center" />

        {/* ATMOSPHERIC GRAIN - Hardware Optimized */}
        <div 
          className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.015] will-change-transform" 
          aria-hidden="true"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <PresenceBar user={profile} />
          <Navigation user={profile} />
          
          <main className="flex-grow pt-safe-top">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
