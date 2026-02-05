/**
 * KYNAR UNIVERSE: Pricing Engine (v2.1.1)
 * Role: Deterministic mapping of Lemon Squeezy IDs to numeric values.
 * Fix: Corrected environment check and enforced strict numeric returns.
 */

/**
 * Registry of active Lemon Squeezy Price IDs and their GBP values.
 */
const PRICE_MAP: Record<string, number> = {
  // Free / Lead Magnets
  'free': 0,
  
  // Example Tiers
  'pri_01hs5xyz...': 5,   
  'pri_01hs6abc...': 12,  
  'pri_01hs7def...': 25,  
  'pri_01hs8ghi...': 45,  
};

const FALLBACK_PRICE = 0;

/**
 * IDENTITY: Resolves a Lemon Squeezy Price ID to a numeric value.
 * Guaranteed to return a number to satisfy tsc --strict arithmetic.
 */
export function getPriceFromId(priceId: string | null | undefined): number {
  if (!priceId) return FALLBACK_PRICE;
  
  // Direct lookup using indexed access
  const price = PRICE_MAP[priceId];

  if (price !== undefined) {
    return price;
  }

  // Corrected Environment Check: Use NODE_ENV for build-stage logic
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Pricing Engine] Unknown price_id: ${priceId}. Falling back to 0.`);
  }

  return FALLBACK_PRICE;
}

/**
 * UTILITY: Checks if a product is free based on its ID.
 */
export function isProductFree(priceId: string | null | undefined): boolean {
  return getPriceFromId(priceId) === 0;
}

/**
 * SERVER/EDGE: Validation helper for secure checkout sessions.
 */
export function validatePriceMatch(priceId: string, claimedPrice: number): boolean {
  const actualPrice = getPriceFromId(priceId);
  return actualPrice === claimedPrice;
}
