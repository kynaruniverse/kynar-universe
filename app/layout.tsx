import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kynar Universe',
  description: 'One universe, unlimited solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-canvas text-primary antialiased min-h-screen pb-20 pt-16`}>
        <TopBar />
        <main className="max-w-md mx-auto min-h-screen relative">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
