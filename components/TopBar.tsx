'use client';

import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-kyn-slate-900/80 backdrop-blur-md border-b border-kyn-slate-200 dark:border-kyn-slate-800 h-16">
      <div className="max-w-md mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight text-kyn-green-800 dark:text-kyn-green-400">
          KYNAR
        </Link>

        {/* Icons (Right Side) */}
        <div className="flex items-center space-x-2">
          {/* Store / Browse Link */}
          <Link href="/store" className="p-2 text-kyn-slate-600 dark:text-kyn-slate-300 hover:text-kyn-green-600 transition-colors relative">
            <ShoppingBag size={22} />
            {/* Optional: You can keep the dot if you want, or remove it until Cart logic is built */}
            {/* <span className="absolute top-2 right-2 w-2 h-2 bg-kyn-green-500 rounded-full"></span> */}
          </Link>
          
          {/* Smart User Link */}
          <Link 
            href={user ? "/account" : "/login"} 
            className={`
              p-2 transition-colors
              ${user 
                ? 'text-kyn-green-600 dark:text-kyn-green-400' // Green = Logged In
                : 'text-kyn-slate-600 dark:text-kyn-slate-300 hover:text-kyn-green-600'} 
            `}
          >
            <User size={22} />
          </Link>
        </div>
      </div>
    </header>
  );
}
