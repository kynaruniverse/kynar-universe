import './globals.css';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { MiniCart } from '@/components/shared/MiniCart';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Kynar Universe | One Universe, Unlimited Solutions',
  description: 'Organise your home, lifestyle, and projects with curated digital assets.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-kyn-canvas dark:bg-kyn-slate-900 text-kyn-slate-900 dark:text-kyn-canvas antialiased selection:bg-kyn-green-100 selection:text-kyn-green-900">
        {/* 1. AuthProvider: Tracks user sessions & profiles (Gatekeeper) */}
        <AuthProvider>
          {/* 2. CartProvider: Manages the "Add to Universe" logic (Engine) */}
          <CartProvider>
            
            {/* Persistent Top Header (Visual Guide 1.1) */}
            <TopBar />

            {/* Main Content Area 
                pt-16 accounts for TopBar height.
                pb-24 accounts for BottomNav height on mobile.
            */}
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
