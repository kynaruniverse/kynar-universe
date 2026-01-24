import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, Store } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-canvas pb-24">
        
        {/* Admin Header */}
        <header 
          className="
            sticky top-0 z-40 h-16 px-4
            bg-surface/80 backdrop-blur-md
            border-b border-kyn-slate-200 dark:border-kyn-slate-800
            flex items-center justify-between
          "
        >
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-kyn-slate-500 hover:text-primary transition-colors"
              aria-label="Back to Home"
            >
              <ArrowLeft size={20} />
            </Link>
            <span className="font-bold text-lg text-primary tracking-tight">
              Kynar Admin
            </span>
          </div>

          <div className="flex items-center gap-4">
             {/* Link to view live store */}
             <Link 
               href="/store" 
               className="text-kyn-slate-500 hover:text-kyn-green-600 transition-colors"
               aria-label="View Live Store"
             >
                <Store size={20} />
             </Link>
             
             {/* Dashboard Link */}
             <Link 
               href="/admin" 
               className="text-primary hover:text-kyn-green-600 transition-colors"
             >
                <LayoutDashboard size={20} />
             </Link>
          </div>
        </header>

        {/* Page Content */}
        {/* Admin views often need more width than the mobile app, allowing up to 2xl */}
        <main className="max-w-2xl mx-auto p-4 animate-in fade-in duration-500">
          {children}
        </main>

      </div>
    </AdminGuard>
  );
}
