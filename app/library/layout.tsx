/**
 * KYNAR UNIVERSE: Library Layout (v1.6)
 * Role: The Authenticated Frame for The Vault.
 */

import React from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PresenceBar } from "@/components/layout/PresenceBar";
import { ShieldCheck } from "lucide-react";

interface LibraryLayoutProps {
  children: React.ReactNode;
}

export default function LibraryLayout({ children }: LibraryLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas selection:bg-kyn-green-100">
      
      {/* Auth Context Bar */}
      <PresenceBar />

      {/* Secure Handrail */}
      <nav 
        className="sticky top-0 z-40 w-full border-b border-border bg-canvas/80 backdrop-blur-xl"
        aria-label="Library Navigation"
      >
        <div className="mx-auto max-w-screen-xl px-gutter">
          <div className="flex h-14 items-center justify-between md:h-20">
            <Breadcrumbs 
              paths={[
                { label: "Universe Hub", href: "/" },
                { label: "The Vault", href: "/library", colorClass: "text-kyn-green-600" }
              ]} 
            />
            
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              <ShieldCheck size={14} className="text-kyn-green-500" />
              Secure Vault Access
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-x-hidden pb-safe-bottom">
        {children}
      </main>

      {/* Library Background Pattern */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--text-secondary) 1px, transparent 0)`, 
          backgroundSize: '40px 40px' 
        }}
      />
    </div>
  );
}
