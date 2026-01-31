/**
 * KYNAR UNIVERSE: Pricing & Currency Utilities
 * Aligned with: Design System Section 8 (Price Presentation)
 * Priority: UK-First / Calm Clarity
 */

/**
 * Fallback Price Map (v1.5)
 * Primary prices should ideally come from the Supabase 'products' table,
 * but this serves as a safety utility for local state and hardcoded UI.
 */
const PRICE_MAP: Record<string, number> = {
  "ls_p_123": 0,    // Universe Entrance / Starters
  "ls_p_456": 5,    // Standard Tier
  "ls_p_789": 15,   // Premium Tier
  "ls_p_000": 25,   // Masterclass/Full Systems
};

/**
 * Retrieves numeric price for a given ID.
 * Returns null if ID is invalid to prevent accidental 'Free' assignments.
 */
export function getPriceFromId(priceId: string): number | null {
  if (!priceId) return null;
  return PRICE_MAP[priceId] ?? null;
}

/**
 * Formats a number to Kynar Canonical GBP.
 * * Rules:
 * 1. 0 is always "Free" (Calm label).
 * 2. Whole numbers only (No .00).
 * 3. Consistent with UK-English locale.
 */
export function formatGBP(amount: number | null): string {
  if (amount === null) return "—";
  if (amount === 0) return "Free";
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Logic for "Calm" Checkout Buttons
 * Ensures text reflects immediate ownership intent.
 */
export function getActionButtonLabel(price: number | null): string {
  if (price === 0) return "Add to Library";
  return `Get for ${formatGBP(price)}`;
}
