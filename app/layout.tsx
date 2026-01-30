import './globals.css';
import TopNav from '@/components/layout/TopNav';
import BottomNav from '@/components/layout/BottomNav';

export const metadata = {
  title: 'Kynar Universe',
  description: 'A calm place to organize your digital life.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-kyn-mist text-kyn-green-500 antialiased overflow-x-hidden">
        
        {/* Mobile-first container */}
        <div className="mx-auto min-h-screen max-w-md flex flex-col relative">
          
          {/* Global Top Navigation */}
          <TopNav />

          {/* Page Content */}
          <main className="flex-grow pt-16 pb-32 px-6">
            {children}
          </main>

          {/* Global Bottom Navigation */}
          <BottomNav />

        </div>

      </body>
    </html>
  );
}