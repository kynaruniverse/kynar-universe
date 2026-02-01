/**
 * KYNAR UNIVERSE: Pricing Engine (v1.5)
 * Synchronized with Lemon Squeezy Variant IDs
 */

export type PriceId = 
  | 'price_kyn_10' 
  | 'price_kyn_25' 
  | 'price_kyn_50' 
  | 'price_kyn_75' 
  | 'price_kyn_100';

// Narrowed the record type to the specific PriceId union
const PRICE_MAP: Record<PriceId, number> = {
  'price_kyn_10': 10,
  'price_kyn_25': 25,
  'price_kyn_50': 50,
  'price_kyn_75': 75,
  'price_kyn_100': 100,
};

/**
 * Returns the numerical price. 
 * Build-safe: Returns 0 if ID is missing to prevent sorting crashes.
 */
export function getPriceFromId(priceId: string | null | undefined): number {
  if (!priceId) return 0;
  // Cast priceId as PriceId to access the narrowed map
  return PRICE_MAP[priceId as PriceId] || 0;
}

/**
 * Formats a number to GBP.
 * Example: 50 -> £50 (No decimals for cleaner UX)
 */
export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
