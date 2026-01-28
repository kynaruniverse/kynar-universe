import './globals.css';
import { Inter } from 'next/font/google';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { MiniCart } from '@/components/shared/MiniCart';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Initialize Inter font (Brand Atmosphere 1.3: Street-modern feel)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Utility for clean class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const metadata = {
  title: 'Kynar Universe | One Universe, Unlimited Solutions',
  description: 'Organise your home, lifestyle, and projects with curated digital assets.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kynar.netlify.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen bg-kyn-canvas dark:bg-kyn-slate-950 text-kyn-slate-900 dark:text-kyn-canvas antialiased selection:bg-kyn-green-100 selection:text-kyn-green-900"
      )}>
        {/* 1. AuthProvider: Tracks user sessions & profiles */}
        <AuthProvider>
          {/* 2. CartProvider: Manages the "Add to Universe" logic */}
          <CartProvider>
            
            {/* Persistent Top Header (Visual Guide 1.1) */}
            <TopBar />

            {/* Main Content Area */}
            <main className="flex flex-col min-h-screen pt-16 pb-24 md:pb-0">
              {children}
            </main>

            {/* Global UI Overlays */}
            <MiniCart />

            {/* Persistent Mobile-First Navigation (Visual Guide 1.2) */}
            <BottomNav />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
