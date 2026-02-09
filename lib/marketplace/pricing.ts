/**
 * KYNAR UNIVERSE: Pricing Engine (v2.1.2)
 * Role: Deterministic mapping of Lemon Squeezy Price IDs to numeric GBP values.
 * Improvements:
 *  - Type safety
 *  - Strict numeric returns
 *  - Environment-aware logging
 */

/**
 * Registry of active Lemon Squeezy Price IDs and their GBP values.
 * Extend this as new products are added.
 */
const PRICE_MAP: Record < string, number > = {
  // Free / Lead Magnets
  'free': 0,
  
  // Example Paid Tiers
  'pri_01hs5xyz...': 5,
  'pri_01hs6abc...': 12,
  'pri_01hs7def...': 25,
  'pri_01hs8ghi...': 45,
};

const FALLBACK_PRICE = 0;

/**
 * Resolves a Lemon Squeezy Price ID to its numeric GBP value.
 * Always returns a number, even for unknown IDs.
 */
export function getPriceFromId(priceId: string | null | undefined): number {
  if (!priceId) return FALLBACK_PRICE;
  
  const price = PRICE_MAP[priceId];
  if (price !== undefined) return price;
  
  // Warn in non-production environments if ID is unknown
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Pricing Engine] Unknown price_id "${priceId}". Falling back to £0.`);
  }
  
  return FALLBACK_PRICE;
}

/**
 * Utility: Checks if a product is free.
 */
export function isProductFree(priceId: string | null | undefined): boolean {
  return getPriceFromId(priceId) === 0;
}

/**
 * Validation helper: Confirms that a claimed price matches the official registry.
 * Useful for server-side or edge security checks.
 */
export function validatePriceMatch(priceId: string, claimedPrice: number): boolean {
  return getPriceFromId(priceId) === claimedPrice;
}