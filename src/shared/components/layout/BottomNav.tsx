'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from 'lucide-react'; // Import all icons to map them
import { NAV_ITEMS } from '@/shared/constants/worlds';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 
      bg-surface/80 backdrop-blur-xl 
      border-t border-kyn-slate-200 dark:border-kyn-slate-800 
      pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          // 1. Get the Icon component dynamically
          const Icon = (Icons as any)[item.icon] || Icons.HelpCircle;
          
          // 2. Logic: Strict match for home, startsWith for others
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
                flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200
                ${isActive 
                  ? 'text-kyn-green-600 dark:text-kyn-green-400 scale-105' 
                  : 'text-kyn-slate-400 dark:text-kyn-slate-500 hover:text-kyn-slate-900 dark:hover:text-kyn-slate-200'}
              `}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={isActive ? 'drop-shadow-[0_0_8px_rgba(22,163,74,0.2)]' : ''} 
              />
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              
              {/* Little active indicator dot */}
              {isActive && (
                <div className="absolute top-1 w-1 h-1 rounded-full bg-kyn-green-500 animate-in zoom-in" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
