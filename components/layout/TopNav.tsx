'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname();

  // Hide TopNav on specific admin routes if preferred, or keep it minimal
  const isAdmin = pathname.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-kyn-slate-500/5 px-6 py-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-5 h-5 rounded-full bg-kyn-green-700 group-active:scale-90 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-kyn-green-700">
            Kynar
          </span>
        </Link>

        {isAdmin && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-kyn-caramel-500 bg-kyn-caramel-500/10 px-2 py-1 rounded">
            Admin
          </span>
        )}
      </div>
    </nav>
  );
}
