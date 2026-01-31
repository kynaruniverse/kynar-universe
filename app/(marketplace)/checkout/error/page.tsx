"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, RefreshCw, LifeBuoy } from "lucide-react";

/**
 * KYNAR UNIVERSE: Checkout Error
 * Aligned with UX Canon Section 1 (Reassured State)
 * Provides a soft, grounded landing when technical interruptions occur.
 */
export default function CheckoutErrorPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-gutter text-center animate-in fade-in duration-700">
      
      {/* Visual Anchor: Soft Alert - Design System Section 3.3 */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-kyn-caramel-50">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kyn-caramel-100 text-kyn-caramel-700">
          <LifeBuoy className="h-6 w-6" strokeWidth={2} />
        </div>
      </div>

      <header className="max-w-md space-y-3">
        <h1 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900 md:text-3xl">
          Connection Interrupted
        </h1>
        <p className="font-ui text-sm leading-relaxed text-text-secondary">
          We couldn't establish a secure link to the checkout. Your selection is safe in your cart, but we need to try the connection again.
        </p>
      </header>

      <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
        {/* Primary Action: Retry - Smooth Transition */}
        <button 
          onClick={() => router.refresh()}
          className="flex items-center justify-center gap-3 rounded-kynar bg-kyn-slate-900 py-4 font-brand text-base font-bold text-white calm-transition hover:bg-kyn-slate-800 active:scale-[0.98] shadow-kynar-soft"
        >
          <RefreshCw className="h-4 w-4" />
          Try Connection Again
        </button>

        {/* Secondary Action: Back to Cart - UX Canon Section 2.1 */}
        <Link 
          href="/cart"
          className="flex items-center justify-center gap-3 rounded-kynar border border-border bg-surface py-4 font-brand text-base font-bold text-kyn-slate-900 calm-transition hover:bg-white active:scale-[0.98]"
        >
          <MoveLeft className="h-4 w-4" />
          Back to Selection
        </Link>
      </div>

      <footer className="mt-20 flex flex-col items-center gap-2">
        <div className="h-px w-8 bg-border" />
        <p className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-400">
          Support Code: KY-GATEWAY-01
        </p>
      </footer>
    </div>
  );
}
