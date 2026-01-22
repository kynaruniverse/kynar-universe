import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-kyn-slate-900/80 backdrop-blur-md border-b border-kyn-slate-200 dark:border-kyn-slate-800 h-16">
      <div className="max-w-md mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight text-kyn-green-800 dark:text-kyn-green-400">
          KYNAR
        </Link>

        {/* Icons (Right Side) */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-kyn-slate-600 dark:text-kyn-slate-300">
            <ShoppingBag size={24} />
            {/* Cart Badge Placeholder */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-kyn-green-500 rounded-full"></span>
          </button>
          <button className="p-2 text-kyn-slate-600 dark:text-kyn-slate-300">
            <User size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
