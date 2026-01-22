import Link from 'next/link';
import { Home, Grid, Store, BookOpen, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Browse', icon: Grid, href: '/browse' },
    { label: 'Store', icon: Store, href: '/store' },
    { label: 'Guides', icon: BookOpen, href: '/guides' },
    { label: 'Library', icon: User, href: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-kyn-slate-900 border-t border-kyn-slate-200 dark:border-kyn-slate-800 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-kyn-slate-500 hover:text-kyn-green-600 dark:hover:text-kyn-green-400"
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
