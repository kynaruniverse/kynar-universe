"use client";

/**
 * KYNAR UNIVERSE: Checkout Error (v1.5)
 * Role: Grounded recovery and technical reassurance.
 * Alignment: UX Canon Section 1 (Reassured State) & Design System 3.3.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, RefreshCw, LifeBuoy, AlertCircle } from "lucide-react";

export default function CheckoutErrorPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // 1. Prevent Hydration Mismatch for Client-Only Logic
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex min-h-[85vh] flex-col items-center justify-center px-gutter text-center selection:bg-kyn-caramel-100">
      
      {/* Visual Anchor: Caramel Alert Palette (Design System 3.3) */}
      <div className="animate-in fade-in zoom-in-95 duration-700 ease-out flex flex-col items-center">
        <div className="relative mb-10">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-kyn-caramel-50 border border-kyn-caramel-100 shadow-kynar-soft">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-kyn-caramel-600 shadow-sm">
              <LifeBuoy className="h-7 w-7 animate-spin-slow" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute -right-1 -top-1 rounded-full bg-white p-2 shadow-sm border border-border">
            <AlertCircle size={16} className="text-kyn-caramel-500" />
          </div>
        </div>

        <header className="max-w-md space-y-6">
          <h1 className="font-brand text-3xl font-bold tracking-tight text-kyn-slate-900 md:text-5xl">
            Connection <span className="italic">Interrupted.</span>
          </h1>
          <p className="font-ui text-base leading-relaxed text-text-secondary px-4 md:text-lg">
            We couldn&apos;t establish a secure link to the gateway. Your selection remains safely stored in your vault.
          </p>
        </header>

        {/* Action Zone: Tactical Recovery Actions */}
        <div className="mt-12 flex w-full max-w-sm flex-col gap-4">
          <button 
            onClick={() => router.refresh()}
            className="group flex items-center justify-center gap-3 rounded-2xl bg-kyn-slate-900 py-5 font-brand text-base font-bold text-white transition-all hover:bg-black active:scale-[0.97] shadow-xl"
          >
            <RefreshCw className="h-5 w-5 transition-transform group-hover:rotate-180 duration-700" />
            Try Connection Again
          </button>

          <Link 
            href="/cart"
            className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-white py-5 font-brand text-base font-bold text-kyn-slate-900 transition-all hover:bg-surface active:scale-[0.97]"
          >
            <MoveLeft className="h-4 w-4" />
            Back to Selection
          </Link>
        </div>

        {/* Technical Metadata: Troubleshooting Layer */}
        <footer className="mt-24 flex flex-col items-center gap-4">
          <div className="h-px w-10 bg-border" />
          <div className="space-y-1">
            <p className="font-ui text-[10px] font-bold uppercase tracking-[0.3em] text-kyn-slate-400">
              System Status: Pending Re-entry
            </p>
            <p className="font-ui text-[9px] text-kyn-caramel-600/60 uppercase tracking-widest">
              Error Hash: KY-GATEWAY-01-SECURE
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
