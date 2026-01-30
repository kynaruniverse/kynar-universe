'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Globe, 
  Library, 
  User, 
  Settings 
} from 'lucide-react'; // Lucide icons for clarity

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Store', href: '/', icon: LayoutGrid },
    { label: 'Worlds', href: '/worlds', icon: Globe },
    { label: 'Library', href: '/library', icon: Library },
    { label: 'Account', href: '/account', icon: User },
  ];

  // If user is on an admin page, we might show an Admin tab instead
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    navItems.push({ label: 'Panel', href: '/admin/products', icon: Settings });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-kyn-slate-500/10 pb-6 pt-3 px-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={`
                p-2 rounded-2xl transition-all duration-300
                ${isActive ? 'bg-kyn-green-700 text-white' : 'text-kyn-slate-400 group-active:bg-kyn-slate-100'}
              `}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`
                text-[9px] uppercase tracking-widest font-bold transition-colors
                ${isActive ? 'text-kyn-green-700' : 'text-kyn-slate-400'}
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
