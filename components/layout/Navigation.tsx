/**
 * KYNAR UNIVERSE: Navigation Dock (v1.7)
 * Role: Structural orientation and World-hopping.
 * Fix: Added initialProfile prop to satisfy TS2322 and layout sync.
 */

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Library, User, X, Globe, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/browser'; 
import { Session } from '@supabase/supabase-js';
import { Profile } from '@/lib/supabase/types';

interface NavigationProps {
  initialProfile?: Profile | null;
}

export const Navigation = ({ initialProfile }: NavigationProps) => {
  const pathname = usePathname();
  const [showWorlds, setShowWorlds] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [mounted, setMounted] = useState(false);
  // Optional: You can also use initialProfile here to sync UI state
  
  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    
    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    
    // Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '#', icon: Compass, action: () => setShowWorlds(true) },
    { label: 'Library', href: '/library', icon: Library },
    { 
      label: 'Account', 
      // Use either the active session or the initialProfile as a fallback for the link destination
      href: (session || initialProfile) ? '/account' : '/auth/login', 
      icon: User 
    },
  ];

  // Prevent hydration mismatch: Render a simple skeleton if not mounted
  if (!mounted) return <div className="fixed bottom-0 h-16 w-full bg-canvas/80 backdrop-blur-lg" />;

  return (
    <>
      {/* MOBILE BOTTOM NAVIGATION DOCK */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-[100] border-t border-kyn-slate-50 bg-canvas/90 backdrop-blur-xl pb-[env(safe-area-inset-bottom,1.5rem)]"
        aria-label="Mobile Navigation"
      >
        <div className="flex h-16 items-center justify-around px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.href) && item.href !== '#';

            const content = (
              <div className="flex flex-col items-center gap-1 group">
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "text-kyn-slate-900 translate-y-[-2px]" : "text-kyn-slate-400"
                  )} 
                />
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.1em] font-ui transition-colors",
                  isActive ? "text-kyn-slate-900" : "text-kyn-slate-400"
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-kyn-slate-900 animate-in fade-in zoom-in" />
                )}
              </div>
            );

            return item.action ? (
              <button 
                key={item.label} 
                onClick={item.action} 
                className="relative flex flex-1 flex-col items-center justify-center py-2"
                aria-haspopup="dialog"
              >
                {content}
              </button>
            ) : (
              <Link 
                key={item.label} 
                href={item.href} 
                className="relative flex flex-1 flex-col items-center justify-center py-2"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* WORLDS PORTAL (Drawer) */}
      {showWorlds && (
        <div className="fixed inset-0 z-[110] flex items-end">
          <div 
            className="absolute inset-0 bg-kyn-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" 
            onClick={() => setShowWorlds(false)} 
          />
          <div className="relative w-full rounded-t-[2.5rem] bg-white p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-in-out">
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-kyn-slate-100" />
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-brand text-2xl font-bold text-kyn-slate-900">Explore Domains</h2>
              <button 
                onClick={() => setShowWorlds(false)} 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-kyn-slate-50 text-kyn-slate-900 active:scale-90 transition-transform"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4">
              <WorldLink 
                href="/store?world=Home" 
                title="Home" 
                icon={<Globe size={24} className="text-kyn-green-600" />} 
                color="bg-kyn-green-50" 
                description="Spatial organization and living architecture."
              />
              <WorldLink 
                href="/store?world=Lifestyle" 
                title="Lifestyle" 
                icon={<Sparkles size={24} className="text-kyn-caramel-600" />} 
                color="bg-kyn-caramel-50" 
                description="Habits, rituals, and sensory intelligence."
              />
              <WorldLink 
                href="/store?world=Tools" 
                title="Tools" 
                icon={<Shield size={24} className="text-kyn-slate-600" />} 
                color="bg-kyn-slate-100" 
                description="Frameworks and technical assets."
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface WorldLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

function WorldLink({ href, title, icon, color, description }: WorldLinkProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-5 p-4 rounded-3xl border border-kyn-slate-50 bg-white shadow-sm active:scale-[0.97] active:bg-kyn-slate-50 transition-all group"
    >
      <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-inner", color)}>
        {icon}
      </div>
      <div className="flex-1">
        <span className="block font-brand font-bold text-kyn-slate-900">{title} World</span>
        <span className="block font-ui text-[11px] text-kyn-slate-400 leading-tight mt-0.5">{description}</span>
      </div>
      <ChevronRight size={18} className="text-kyn-slate-200 group-hover:text-kyn-slate-400 transition-colors" />
    </Link>
  );
}
