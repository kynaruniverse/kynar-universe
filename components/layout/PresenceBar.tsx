"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Fingerprint, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/browser";
import { useCartItems } from "@/lib/cart/store";
import { useUIStore } from "@/lib/store/ui";
import { Profile } from "@/lib/supabase/types";

interface PresenceBarProps {
  initialProfile?: Profile | null;
  context?: string; 
}

export const PresenceBar = ({ initialProfile, context = "Universe" }: PresenceBarProps) => {
  const [profile, setProfile] = useState<Profile | null>(initialProfile || null);
  const [mounted, setMounted] = useState(false);
  
  // Global UI State
  const openSelection = useUIStore((state) => state.openSelection);
  const toggleUserMenu = useUIStore((state) => state.toggleUserMenu);
  const isUserMenuOpen = useUIStore((state) => state.isUserMenuOpen);

  // Cart State
  const { count } = useCartItems();

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    
    // Listen for Auth changes to update the Presence Indicator
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (data) setProfile(data as Profile);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []); 

  // Prevent hydration mismatch for dynamic counts
  const selectionCount = mounted ? count : 0;
  const isUserActive = mounted && profile;

  return (
    <header className="sticky top-0 z-[70] flex h-16 items-center justify-between border-b border-border bg-canvas/80 px-gutter backdrop-blur-xl transition-all duration-500">
      
      {/* BRAND LOGO */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-kyn-slate-900 text-white transition-transform group-hover:rotate-6 shadow-sm">
          <Fingerprint size={14} strokeWidth={2.5} />
        </div>
        <span className="font-brand text-sm font-black uppercase tracking-[0.25em] text-kyn-slate-900">
          KYNAR
        </span>
      </Link>
      
      {/* ACTION CLUSTER */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* CONTEXT LABEL */}
        <span className="hidden xs:block text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400 font-ui">
          {context}
        </span>
        
        <div className="hidden xs:block h-3 w-[1px] bg-border mx-1" />

        {/* SELECTION (CART) TRIGGER */}
        <button 
          onClick={openSelection}
          aria-label="Open Selection"
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95",
            selectionCount > 0 
              ? "bg-kyn-green-500 text-white shadow-lg shadow-kyn-green-500/20" 
              : "bg-surface text-kyn-slate-400 border border-border hover:border-kyn-slate-200"
          )}
        >
          <ShoppingBag size={16} strokeWidth={2.5} />
          {selectionCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-in zoom-in items-center justify-center rounded-full bg-kyn-slate-900 text-[8px] font-bold text-white border-2 border-canvas">
              {selectionCount}
            </span>
          )}
        </button>

        {/* IDENTITY (USER) TRIGGER */}
        <button 
          onClick={toggleUserMenu}
          aria-label="User Menu"
          className={cn(
            "group relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-90",
            isUserMenuOpen 
              ? "bg-kyn-slate-900 text-white border-kyn-slate-900 shadow-lg shadow-kyn-slate-900/10" 
              : "bg-surface border-border text-kyn-slate-400 hover:border-kyn-slate-900/20"
          )}
        >
          <User size={16} strokeWidth={2.5} />
          
          {/* Status Indicator Dot */}
          {isUserActive && (
            <span className="absolute right-2.5 top-2.5 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kyn-green-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-kyn-green-500"></span>
            </span>
          )}
          
          {/* Subtle Pulse Ring for Logged In State */}
          {isUserActive && !isUserMenuOpen && (
            <span className="absolute inset-0 rounded-xl ring-2 ring-kyn-green-500/10 animate-pulse pointer-events-none" />
          )}
        </button>

      </div>
    </header>
  );
};
