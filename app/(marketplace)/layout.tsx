/**
 * KYNAR UNIVERSE: Marketplace Layout (v1.6)
 * Role: Orientation Layer for Store, Product, and Cart flows.
 */


import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas selection:bg-kyn-green-100">
      
      {/* Transactional Handrail */}
      <nav 
        className="sticky top-0 z-40 w-full border-b border-kyn-slate-50 bg-canvas/80 backdrop-blur-xl"
        aria-label="Marketplace Navigation"
      >
        <div className="mx-auto max-w-screen-xl px-gutter">
          <div className="flex h-14 items-center md:h-20">
            <Breadcrumbs 
              paths={[
                { label: "Universe Hub", href: "/" },
                { label: "Marketplace", href: "/store" }
              ]} 
            />
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-x-hidden">
        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      </main>

      {/* Mobile Fade */}
      <aside className="pointer-events-none fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-canvas to-transparent md:hidden z-30" />
    </div>
  );
}
