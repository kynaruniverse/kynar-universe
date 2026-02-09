"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Compass, LayoutGrid } from "lucide-react";
import { useCartItems } from "@/lib/cart/store";
import { useUIStore } from "@/lib/store/ui";
import { cn } from "@/lib/utils";
import { Database } from "@/lib/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface NavigationProps {
  initialProfile ? : Profile | null;
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const Navigation = ({ initialProfile }: NavigationProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  const { isSelectionOpen, openSelection, isUserMenuOpen, toggleUserMenu } = useUIStore();
  const { count } = useCartItems();
  
  // Prevent hydration mismatch for client-side state
  useEffect(() => setMounted(true), []);
  
  const navLinks: NavLink[] = [
    { name: "Store", href: "/store", icon: Compass },
    { name: "Library", href: "/library", icon: LayoutGrid },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 z-[60] w-full border-t border-border bg-canvas/90 pb-safe-bottom backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-around px-gutter">
        
        {/* Primary Navigation Links */}
        {navLinks.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href && !isUserMenuOpen && !isSelectionOpen;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex flex-col items-center gap-1 transition-all active:scale-90",
                isActive ? "text-kyn-slate-900" : "text-kyn-slate-400"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-colors", isActive && "text-kyn-green-600")}
              />
              <span className="font-brand text-[9px] font-black uppercase tracking-[0.15em]">
                {name}
              </span>
              {isActive && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-kyn-green-500" />}
            </Link>
          );
        })}

        {/* Selection / Cart Trigger */}
        <button
          onClick={openSelection}
          className={cn(
            "group relative flex flex-col items-center gap-1 transition-all active:scale-90 outline-none",
            isSelectionOpen ? "text-kyn-green-600" : "text-kyn-slate-400"
          )}
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={isSelectionOpen ? 2.5 : 2} />
            {mounted && count > 0 && (
              <span className="absolute -right-2.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-kyn-slate-900 font-ui text-[8px] font-bold text-white border-2 border-canvas animate-in zoom-in duration-300">
                {count}
              </span>
            )}
          </div>
          <span className="font-brand text-[9px] font-black uppercase tracking-[0.15em]">
            Selection
          </span>
        </button>

        {/* Identity / User Menu Trigger */}
        <button
          onClick={toggleUserMenu}
          className={cn(
            "group relative flex flex-col items-center gap-1 transition-all active:scale-90 outline-none",
            isUserMenuOpen ? "text-kyn-slate-900" : "text-kyn-slate-400"
          )}
        >
          <div className="relative">
            <User size={20} strokeWidth={isUserMenuOpen ? 2.5 : 2} />
            
            {mounted && initialProfile && !isUserMenuOpen && (
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-kyn-green-500 ring-2 ring-canvas" />
            )}
          </div>
          <span className="font-brand text-[9px] font-black uppercase tracking-[0.15em]">
            Identity
          </span>
          {isUserMenuOpen && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-kyn-slate-900" />}
        </button>
      </div>
    </nav>
  );
};