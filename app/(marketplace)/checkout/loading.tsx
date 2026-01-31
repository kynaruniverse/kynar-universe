/**
 * KYNAR UNIVERSE: Checkout Loading
 * Aligned with UX Canon Section 1 (Reassured State)
 * Provides a secure, calm transition before the external handoff.
 */
export default function CheckoutLoading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-gutter text-center">
      {/* Structural Loading Indicator - Design System Section 11 */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="h-16 w-16 rounded-full border-2 border-kyn-slate-100" />
        {/* Spinning Anchor */}
        <div className="absolute h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-kyn-green-600" />
        {/* Static Center Core */}
        <div className="absolute h-2 w-2 rounded-full bg-kyn-slate-900" />
      </div>
      
      <div className="space-y-3">
        <h2 className="font-brand text-2xl font-bold tracking-tight text-kyn-slate-900">
          Securing your connection
        </h2>
        <p className="mx-auto max-w-xs font-ui text-sm leading-relaxed text-text-secondary">
          Please wait a moment while we prepare your secure handoff to the checkout.
        </p>
      </div>

      {/* Security Reassurance - Business Reference Section 7 */}
      <div className="mt-12 flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-kyn-slate-400 font-ui">
        <span className="h-1.5 w-1.5 rounded-full bg-kyn-green-500 animate-pulse" />
        Encrypted Handoff
      </div>
    </div>
  );
}
