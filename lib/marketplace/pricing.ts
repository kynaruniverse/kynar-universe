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

const PRICE_MAP: Record<string, number> = {
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
  return PRICE_MAP[priceId] || 0;
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(amount);
}
