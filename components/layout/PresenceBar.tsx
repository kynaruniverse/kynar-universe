/* KYNAR UNIVERSE: components/layout/PresenceBar.tsx */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/browser";
import { useCartItems } from "@/lib/cart/store";
import { useUIStore } from "@/lib/store/ui";
import { Profile } from "@/lib/supabase/types";
import UserMenu from "./UserMenu"; 

interface PresenceBarProps {
  initialProfile?: Profile | null;
  context?: string; 
}

export const PresenceBar = ({ initialProfile, context = "Universe" }: PresenceBarProps) => {
  const [profile, setProfile] = useState<Profile | null>(initialProfile || null);
  const [mounted, setMounted] = useState(false);
  
  // Correctly using the global UI store
  const openSelection = useUIStore((state) => state.openSelection);
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

  const selectionCount = mounted ? count : 0;

  return (
    <header className="sticky top-0 z-[50] flex h-16 items-center justify-between border-b border-border bg-canvas/80 px-gutter backdrop-blur-xl transition-all duration-500">
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

        <button 
          onClick={openSelection}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95",
            selectionCount > 0 
              ? "bg-kyn-green-500 text-white shadow-lg shadow-kyn-green-500/20" 
              : "bg-surface text-kyn-slate-400 border border-border"
          )}
        >
          {/* FIXED: Corrected casing to match the import */}
          <ShoppingBag size={16} strokeWidth={2.5} />
          {selectionCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-in zoom-in items-center justify-center rounded-full bg-kyn-slate-900 text-[8px] font-bold text-white border-2 border-canvas">
              {selectionCount}
            </span>
          )}
        </button>

        <UserMenu user={profile} />
      </div>
    </header>
  );
};
