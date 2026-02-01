"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User, Menu } from "lucide-react";
// Fixed: Relative pathing for reliable root-level resolution on Netlify
import { Database } from "../../lib/supabase/types"; 
import { createClient } from "../../lib/supabase/browser";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface PresenceBarProps {
  initialProfile: Profile | null;
  context?: string; 
  onMenuClick?: () => void;
}

/**
 * KYNAR UNIVERSE: Presence Bar
 * Purpose: Global orientation and identity anchor.
 * Design Rule: Calm, neutral, and persistent.
 */
export const PresenceBar = ({ 
  initialProfile, 
  context = "Universe", 
  onMenuClick 
}: PresenceBarProps) => {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  // Initializing supabase inside the component to ensure it uses the browser-specific client
  const supabase = createClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Optimization: Only fetch if we don't have the profile or if identity changed
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          
          if (data) {
            setProfile(data);
          }
        } else if (event === "SIGNED_OUT") {
          setProfile(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border bg-canvas/95 px-4 backdrop-blur-sm md:h-16 md:px-6">
      <div className="flex items-center gap-3">
        {/* The Hub Trigger - Minimalist Icon per Design System */}
        <button 
          onClick={onMenuClick}
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary hover:bg-surface transition-all duration-300"
          aria-label="Open Navigation"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
        
        <Link 
          href="/" 
          className="font-brand text-[15px] font-bold tracking-widest text-text-primary uppercase"
        >
          KYNAR
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Orientation Context - Visible on mobile to anchor the user */}
        <span className="text-[11px] font-medium uppercase tracking-widest text-text-secondary/60 font-ui">
          {context}
        </span>

        <div className="h-3 w-[1px] bg-border" />

        {/* Identity & Presence */}
        <div className="flex items-center">
          {profile ? (
            <Link 
              href="/library" 
              className="flex items-center gap-2 group"
              aria-label="View Library"
            >
              <span className="hidden md:block text-[13px] font-medium text-text-primary">
                {profile.full_name?.split(' ')[0] || "Library"}
              </span>
              <div className="h-8 w-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary group-hover:border-text-primary transition-colors duration-300">
                <User size={16} strokeWidth={1.5} />
              </div>
            </Link>
          ) : (
            <Link 
              href="/auth/login" 
              className="h-8 w-8 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors duration-300"
              aria-label="Sign In"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
