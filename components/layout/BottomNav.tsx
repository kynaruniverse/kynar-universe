"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  BookOpen, 
  Orbit, 
  Library, 
  HelpCircle 
} from 'lucide-react';

export const BottomNav = () => {
  const pathname = usePathname();

  // Helper to check if the link is active - improved for nested routes
  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const navItems = [
    { name: 'Browse', path: '/store', icon: ShoppingBag },
    { name: 'Guides', path: '/guides', icon: BookOpen },
    { name: 'Worlds', path: '/world', icon: Orbit },
    { name: 'Library', path: '/library', icon: Library },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-kyn-slate-900/80 backdrop-blur-xl border-t border-kyn-slate-100 dark:border-kyn-slate-800 z-50 md:hidden">
      <div className="flex justify-around items-center h-20 px-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className="flex flex-col items-center justify-center w-full gap-1 relative pt-2"
            >
              <div className={`transition-all duration-300 ${
                active 
                  ? 'text-kyn-green-500 scale-110' 
                  : 'text-kyn-slate-400 active:scale-90'
              }`}>
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              </div>
              
              <span className={`text-[8px] font-black uppercase tracking-[0.15em] transition-colors ${
                active ? 'text-kyn-slate-900 dark:text-white' : 'text-kyn-slate-400'
              }`}>
                {item.name}
              </span>
              
              {/* Active Indicator: Subtle Forest Green Glow (Visual Guide 11.1) */}
              {active && (
                <div className="absolute top-0 w-8 h-1 bg-kyn-green-500 rounded-b-full shadow-[0_0_12px_rgba(34,197,94,0.4)] animate-in slide-in-from-top-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
