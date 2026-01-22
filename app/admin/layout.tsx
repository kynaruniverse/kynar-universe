import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, Plus } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-kyn-slate-50 dark:bg-kyn-slate-900 pb-24">
        {/* Admin Header */}
        <header className="bg-white dark:bg-kyn-slate-800 border-b border-kyn-slate-200 dark:border-kyn-slate-700 px-4 h-16 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-kyn-slate-500 hover:text-kyn-green-600">
              <ArrowLeft size={20} />
            </Link>
            <span className="font-bold text-lg text-kyn-slate-900 dark:text-white">
              Admin
            </span>
          </div>
          <div className="flex gap-4">
             <Link href="/admin" className="text-kyn-slate-500 hover:text-kyn-green-600">
                <LayoutDashboard size={20} />
             </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-2xl mx-auto p-4">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
