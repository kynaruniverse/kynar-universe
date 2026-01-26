'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Specific imports to keep the bundle small and fast on mobile
import { Home, Store, Compass, Library, User, HelpCircle } from 'lucide-react';
import { NAV_ITEMS } from '@/shared/constants/worlds';

// Map icon strings to components locally
const IconMap: Record<string, any> = {
  Home,
  Store,
  Compass,
  Library,
  User,
};

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 
      bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl 
      border-t border-kyn-slate-100 dark:border-kyn-slate-800 
      pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]"
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto relative">
        {NAV_ITEMS.map((item) => {
          const Icon = IconMap[item.icon] || HelpCircle;
          
          const isActive = item.href === '/' 
            ? pathname === '/'
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.label} 
              href={item.href}
              aria-label={item.label}
              className={`
                relative flex flex-col items-center justify-center w-full h-full transition-all duration-300
                ${isActive 
                  ? 'text-primary' 
                  : 'text-kyn-slate-400 dark:text-kyn-slate-500'}
              `}
            >
              {/* Active Dot Indicator */}
              {isActive && (
                <div className="absolute top-1 w-1 h-1 rounded-full bg-kyn-green-500 animate-in zoom-in duration-500" />
              )}

              <Icon 
                size={20} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`}
              />
              
              <span className={`
                text-[9px] uppercase tracking-[0.1em] 
                ${isActive ? 'font-black italic' : 'font-bold opacity-60'}
              `}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
