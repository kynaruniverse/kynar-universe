/**
 * KYNAR UNIVERSE: Marketplace Layout (v1.5)
 * Role: Orientation Layer for Store, Product, and Cart flows.
 * Philosophy: Transactional Calm — Minimalist, focused, and secure.
 * Optimization: Mobile-first ergonomic handrail & Next.js 15 structure.
 */

import React from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas selection:bg-kyn-green-100">
      
      {/* The Handrail (Orientation Layer)
          Designed for immediate thumb-reach navigation and context.
          Sticky-ready for mobile scrolling consistency.
      */}
      <nav 
        className="sticky top-0 z-40 w-full border-b border-kyn-slate-50 bg-canvas/80 backdrop-blur-xl"
        aria-label="Marketplace Navigation"
      >
        <div className="mx-auto max-w-screen-xl px-gutter">
          <div className="flex h-14 items-center md:h-20">
            {/* Breadcrumbs are provided here as a fallback/root state. 
                Sub-pages (Product/Store) should inject their own segments 
                via a shared state or layout-local component if required.
            */}
            <Breadcrumbs 
              paths={[
                { label: "Universe Hub", href: "/" },
                { label: "Marketplace", href: "/store", colorClass: "text-kyn-slate-900" }
              ]} 
            />
          </div>
        </div>
      </nav>

      {/* Transactional Stage
          The 'flex-1' ensures that even short pages (Error/Empty Cart) 
          maintain the structural integrity of the layout.
      */}
      <div className="flex-1 overflow-x-hidden">
        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      </div>

      {/* UX Canon: Distraction-Free Zone
          We intentionally omit heavy global footers here to keep the 
          user focused on the selection and acquisition process.
          Small regulatory or trust signals are handled by sub-page footers.
      */}
      <aside className="pointer-events-none fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-canvas to-transparent md:hidden" />
    </div>
  );
}
