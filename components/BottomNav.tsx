'use client'; // Marked as client component to use hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Store, BookOpen, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Browse', icon: Grid, href: '/store' }, // Changed href to /store for clarity
    { label: 'Guides', icon: BookOpen, href: '/guides' },
    { label: 'Library', icon: User, href: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-kyn-slate-900 border-t border-kyn-slate-200 dark:border-kyn-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          // Check if this tab is active
          // We handle the home page '/' specifically to avoid it matching everything
          const isActive = item.href === '/' 
            ? pathname === '/'
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.label} 
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors
                ${isActive 
                  ? 'text-kyn-green-600 dark:text-kyn-green-400' 
                  : 'text-kyn-slate-400 dark:text-kyn-slate-500 hover:text-kyn-slate-600 dark:hover:text-kyn-slate-300'}
              `}
            >
              <item.icon size={isActive ? 24 : 20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
