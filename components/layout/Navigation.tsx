/**
 * KYNAR UNIVERSE: Global Navigation (v1.5)
 * Aligned with: UX Canon Section 2 (Navigation) & Design System Section 12 (Worlds)
 * Priority: Mobile-first, Auth-aware, Calm Motion.
 */

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Library, User, X } from 'lucide-react';
import { clsx } from 'clsx';
import { createClient } from '@/lib/supabase/browser'; // Auth Awareness

export default function Navigation() {
  const pathname = usePathname();
  const [showWorlds, setShowWorlds] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Auth Hook: Determine if Library/Account should be active
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const worlds = [
    { name: 'Home', href: '/home', color: 'text-kyn-green-700', dot: 'bg-kyn-green-600' },
    { name: 'Lifestyle', href: '/lifestyle', color: 'text-kyn-caramel-700', dot: 'bg-kyn-caramel-600' },
    { name: 'Tools', href: '/tools', color: 'text-kyn-slate-700', dot: 'bg-kyn-slate-500' },
  ];

  const navItems = [
    { label: 'Universe', href: '/', icon: Home, show: true },
    { label: 'Worlds', href: '#', icon: Compass, show: true, onClick: () => setShowWorlds(!showWorlds) },
    { label: 'Library', href: '/library', icon: Library, show: !!session },
    { label: 'Account', href: '/account/settings', icon: User, show: true }, // Kept for Login/Settings access
  ];

  return (
    <>
      {/* Worlds Overlay: Grounded Exploration */}
      {showWorlds && (
        <div 
          className="fixed inset-0 z-[60] bg-kyn-slate-900/20 backdrop-blur-md transition-all duration-500 animate-in fade-in" 
          onClick={() => setShowWorlds(false)}
        >
          <div 
            className="absolute bottom-24 left-4 right-4 bg-canvas rounded-2xl p-5 shadow-2xl border border-border animate-in slide-in-from-bottom-6 duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[11px] font-medium text-kyn-slate-400 uppercase tracking-widest font-ui">Explore the Worlds</p>
              <button onClick={() => setShowWorlds(false)} className="text-kyn-slate-300 hover:text-kyn-slate-900 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {worlds.map((world) => (
                <Link
                  key={world.name}
                  href={world.href}
                  className="p-5 rounded-xl flex items-center justify-between bg-surface border border-transparent hover:border-kyn-slate-200 transition-all duration-300 group"
                  onClick={() => setShowWorlds(false)}
                >
                  <span className={clsx("font-brand font-medium text-lg", world.color)}>
                    {world.name}
                  </span>
                  <div className={clsx("w-1.5 h-1.5 rounded-full", world.dot)} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-canvas/90 backdrop-blur-xl border-t border-border px-6 pb-safe">
        <div className="flex items-center justify-between h-full max-w-md mx-auto">
          {navItems.filter(i => i.show).map((item) => {
            const isActive = pathname === item.href || (item.label === 'Worlds' && showWorlds);
            const Icon = item.icon;

            const content = (
              <>
                <div className={clsx(
                  "p-2 rounded-full transition-all duration-500",
                  isActive ? "bg-surface" : "group-hover:bg-surface/50"
                )}>
                  <Icon 
                    size={22} 
                    strokeWidth={isActive ? 2 : 1.5} 
                    className={clsx("transition-colors duration-500", isActive ? 'text-kyn-slate-900' : 'text-kyn-slate-400')} 
                  />
                </div>
                <span className={clsx(
                  "text-[10px] font-medium font-ui transition-colors duration-500", 
                  isActive ? 'text-kyn-slate-900' : 'text-kyn-slate-400'
                )}>
                  {item.label}
                </span>
              </>
            );

            return (
              <div key={item.label} className="flex-1">
                {item.href !== '#' ? (
                  <Link href={item.href} className="flex flex-col items-center gap-1 group">
                    {content}
                  </Link>
                ) : (
                  <button onClick={item.onClick} className="w-full flex flex-col items-center gap-1 group focus:outline-none">
                    {content}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
