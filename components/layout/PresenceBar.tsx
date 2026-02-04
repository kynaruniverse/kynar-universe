/**
 * KYNAR UNIVERSE: Presence Bar (v2.2)
 * Fix: Migrated to useCartItems() atomic hook.
 * Alignment: Next.js 16 Safe Mounted Pattern.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, ShoppingBag, Fingerprint, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/browser";
import { useCartItems } from "@/lib/marketplace/cart-store"; // Fixed: Updated Hook
import { Profile } from "@/lib/supabase/types";

interface PresenceBarProps {
  initialProfile?: Profile | null;
  context?: string; 
}

export const PresenceBar = ({ initialProfile, context = "Universe" }: PresenceBarProps) => {
  const [profile, setProfile] = useState<Profile | null>(initialProfile || null);
  const [mounted, setMounted] = useState(false);
  
  /**
   * Selection Logic: 
   * useCartItems() now handles its own hydration guarding internally.
   */
  const { count } = useCartItems();

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    
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

  // Combined guard: only show numbers once the client is ready
  const selectionCount = mounted ? count : 0;

  return (
    <header className="sticky top-0 z-[80] flex h-16 items-center justify-between border-b border-border bg-canvas/80 px-gutter backdrop-blur-xl transition-all duration-500">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-kyn-slate-900 text-white transition-transform group-hover:rotate-6 shadow-sm">
          <Fingerprint size={14} strokeWidth={2.5} />
        </div>
        <span className="font-brand text-sm font-black uppercase tracking-[0.25em] text-kyn-slate-900">
          KYNAR
        </span>
      </Link>
      
      <div className="flex items-center gap-3">
        <span className="hidden xs:block text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400 font-ui">
          {context}
        </span>
        
        <div className="hidden xs:block h-3 w-[1px] bg-border mx-1" />

        {/* Cart Trigger */}
        <Link 
          href="/cart" 
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-90",
            selectionCount > 0 
              ? "bg-kyn-green-500 text-white shadow-lg shadow-kyn-green-500/20" 
              : "bg-surface text-kyn-slate-400 border border-border"
          )}
        >
          <ShoppingBag size={16} strokeWidth={2.5} />
          {selectionCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-in zoom-in items-center justify-center rounded-full bg-kyn-slate-900 text-[8px] font-bold text-white border-2 border-canvas">
              {selectionCount}
            </span>
          )}
        </Link>

        {/* Identity Trigger */}
        <Link 
          href={profile ? "/account" : "/auth/login"} 
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface shadow-sm transition-all active:scale-90"
        >
          {profile ? (
            <div className="relative">
              <User size={16} className="text-kyn-slate-900" />
              <div className="absolute -bottom-1.5 -right-1.5 text-kyn-green-500">
                <ShieldCheck size={10} strokeWidth={3} />
              </div>
            </div>
          ) : (
            <User size={16} className="text-kyn-slate-400 group-hover:text-kyn-slate-600" />
          )}
          
          {profile && (
            <span className="absolute inset-0 rounded-xl ring-2 ring-kyn-green-500/20 animate-pulse" />
          )}
        </Link>
      </div>
    </header>
  );
};
