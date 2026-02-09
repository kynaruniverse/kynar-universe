/**
 * KYNAR UNIVERSE: Checkout Loading (v1.6)
 * Role: The "Calm Bridge" - Reassured transition to external gateway.
 * Aligned with: UX Canon Section 1 (Reassured State) & Design System Section 11.
 */

import { ShieldCheck, Lock } from "lucide-react";

// --- Subcomponents ---

const ProcessingRing = () => (
  <div className="relative mb-12 flex items-center justify-center">
    {/* Outer Atmospheric Ring */}
    <div className="h-24 w-24 rounded-full border border-kyn-slate-100/50 bg-surface shadow-kynar-soft" />
    {/* Active Processing Ring */}
    <div className="absolute h-24 w-24 animate-spin rounded-full border-2 border-transparent border-t-kyn-green-600" />
    {/* Core Security Identifier */}
    <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-kyn-slate-900 text-white shadow-lg">
      <Lock size={18} strokeWidth={2.5} />
    </div>
  </div>
);

const StatusBadge = () => (
  <div className="flex items-center gap-2.5 rounded-full bg-white border border-border px-5 py-2.5 shadow-sm">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kyn-green-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-kyn-green-500" />
    </span>
    <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] text-kyn-slate-500">
      Encrypted Handoff Active
    </span>
  </div>
);

const ComplianceBadge = () => (
  <div className="flex items-center gap-2 text-kyn-slate-300">
    <ShieldCheck size={14} />
    <span className="font-ui text-[9px] uppercase tracking-widest">
      PCI-DSS Level 1 Compliant
    </span>
  </div>
);

// --- Main Component ---

export default function CheckoutLoading() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-gutter text-center animate-in fade-in duration-500">
      
      {/* Loading Animation */}
      <ProcessingRing />

      {/* Narrative Reassurance */}
      <div className="max-w-xs space-y-4">
        <h2 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900 md:text-3xl">
          Securing your <br /> <span className="italic">connection.</span>
        </h2>
        <p className="font-ui text-sm leading-relaxed text-text-secondary md:text-base">
          Please wait a moment while we prepare your secure handoff to the vault gateway.
        </p>
      </div>

      {/* Security Status Section */}
      <div className="mt-16 flex flex-col items-center gap-6">
        <StatusBadge />
        <ComplianceBadge />
      </div>
    </main>
  );
}