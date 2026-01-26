'use client';

import Link from 'next/link';
import { Store, User } from 'lucide-react';
import { useAuth } from '@/features/auth/components/AuthProvider';

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-16 
      bg-canvas/80 backdrop-blur-md 
      border-b border-kyn-slate-200 dark:border-kyn-slate-800
      transition-colors duration-300"
    >
      <div className="max-w-md mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="font-bold text-xl tracking-tight text-kyn-green-800 dark:text-kyn-green-400"
        >
          KYNAR
        </Link>

        {/* Icons (Right Side) */}
        <div className="flex items-center space-x-2">
          {/* Store / Browse Link */}
          <Link 
            href="/store" 
            aria-label="Browse store"
            className="p-2 text-kyn-slate-600 dark:text-kyn-slate-300 hover:text-kyn-green-600 transition-colors"
          >
            <Store size={22} />
          </Link>
          
          {/* Smart User Link: Changes state based on auth */}
          <Link 
            href={user ? "/account" : "/login"}
            aria-label={user ? "My account" : "Log in"}
            className={`
              p-2 transition-colors
              ${user 
                ? 'text-kyn-green-600 dark:text-kyn-green-400' 
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
