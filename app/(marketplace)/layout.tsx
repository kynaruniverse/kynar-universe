import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import React from "react";

/**
 * KYNAR UNIVERSE: Marketplace Layout
 * Purpose: Provides specific orientation for the Store and Product flows.
 * Rule: Maintains "Transactional Calm" by keeping the UI focused and minimal.
 */

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* MARKETPLACE ORIENTATION LAYER */}
      <div className="bg-canvas border-b border-kyn-slate-50">
        <div className="max-w-screen-xl mx-auto">
          {/* Note: The paths are typically dynamic. 
            This layout provides the container for sub-pages 
            to inject their specific breadcrumb segments.
          */}
          <Breadcrumbs 
            paths={[
              { label: "Store", href: "/store" }
            ]} 
          />
        </div>
      </div>

      {/* MARKETPLACE CONTENT */}
      <div className="flex-1">
        {children}
      </div>

      {/* UX NOTE: We avoid adding heavy footers or distractions here 
         to keep the focus on the product or checkout.
      */}
    </div>
  );
}
