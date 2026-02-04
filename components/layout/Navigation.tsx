"use client";

/**
 * KYNAR UNIVERSE: Navigation & Orientation (v2.3)
 * Fix: Removed unused React import to satisfy Netlify build.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Compass, LayoutGrid } from "lucide-react";
import { useCartItems } from "@/lib/marketplace/cart-store";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { count } = useCartItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Store", href: "/store", icon: Compass },
    { name: "Library", href: "/library", icon: LayoutGrid },
    { name: "Account", href: "/account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-canvas/80 pb-safe-bottom backdrop-blur-xl md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-around px-gutter md:h-20 md:justify-end md:gap-12">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex flex-col items-center gap-1 transition-colors md:flex-row md:gap-3",
                isActive ? "text-kyn-green-500" : "text-kyn-slate-400 hover:text-kyn-slate-900"
              )}
            >
              <Icon size={20} className={cn("transition-transform group-active:scale-90", isActive && "animate-pulse")} />
              <span className="font-brand text-[10px] font-bold uppercase tracking-widest md:text-xs">
                {link.name}
              </span>
              {isActive && (
                <span className="absolute -bottom-1 h-0.5 w-4 rounded-full bg-kyn-green-500 md:hidden" />
              )}
            </Link>
          );
        })}

        <Link
          href="/cart"
          className={cn(
            "group relative flex flex-col items-center gap-1 transition-colors md:flex-row md:gap-3",
            pathname === "/cart" ? "text-kyn-green-600" : "text-kyn-slate-400 hover:text-kyn-slate-900"
          )}
        >
          <div className="relative">
            <ShoppingBag size={20} className="transition-transform group-active:scale-90" />
            {mounted && count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 animate-in zoom-in items-center justify-center rounded-full bg-kyn-green-500 font-ui text-[9px] font-bold text-white shadow-sm">
                {count}
              </span>
            )}
          </div>
          <span className="font-brand text-[10px] font-bold uppercase tracking-widest md:text-xs">
            Selection
          </span>
        </Link>
      </div>
    </nav>
  );
};
