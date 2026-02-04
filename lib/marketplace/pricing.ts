/**
 * KYNAR UNIVERSE: Pricing Engine (v2.1)
 * Role: Deterministic mapping of Lemon Squeezy IDs to numeric values.
 * Logic: Ensures UI components (ProductCard) and formatters (formatGBP) 
 * receive safe, non-NaN values without requiring a DB 'price' column.
 */

/**
 * Registry of active Lemon Squeezy Price IDs and their GBP values.
 * Update this map when adding new products to the store.
 */
const PRICE_MAP: Record<string, number> = {
  // Free / Lead Magnets
  'free': 0,
  
  // Example Tiers (Replace with your actual Lemon Squeezy Price IDs)
  'pri_01hs5xyz...': 5,   // Entry Tier
  'pri_01hs6abc...': 12,  // Standard Tier
  'pri_01hs7def...': 25,  // Premium Tier
  'pri_01hs8ghi...': 45,  // Professional Tier
};

/**
 * Fallback values for missing or unknown IDs
 */
const FALLBACK_PRICE = 0;

/**
 * IDENTITY: Resolves a Lemon Squeezy Price ID to a numeric value.
 * Guaranteed to return a number to prevent 'NaN' in UI formatters.
 */
export function getPriceFromId(priceId: string | null | undefined): number {
  if (!priceId) return FALLBACK_PRICE;
  
  // Direct lookup
  if (Object.prototype.hasOwnProperty.call(PRICE_MAP, priceId)) {
    return PRICE_MAP[priceId];
  }

  // Log unknown IDs in development to ensure the map stays updated
  if (process.env.NODE_VERSION !== 'production') {
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
