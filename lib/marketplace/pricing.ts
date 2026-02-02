/**
 * KYNAR UNIVERSE: Pricing Engine (v1.6)
 * Role: Financial logic, currency localization, and variant mapping.
 * Build Safety: Nominal type guarding & Next.js 15 Server Action compatible.
 */

/**
 * Valid Price IDs synchronized with Lemon Squeezy / Database schema.
 * Using a union type ensures build-time safety for marketplace components.
 */
export type PriceId = 
  | 'price_kyn_10' 
  | 'price_kyn_25' 
  | 'price_kyn_50' 
  | 'price_kyn_75' 
  | 'price_kyn_100';

/**
 * Internal price registry. 
 * Narrowed to PriceId to prevent accidental property access.
 */
const PRICE_MAP: Record<PriceId, number> = {
  'price_kyn_10': 10,
  'price_kyn_25': 25,
  'price_kyn_50': 50,
  'price_kyn_75': 75,
  'price_kyn_100': 100,
};

/**
 * getPriceFromId: Extracts numerical value from a PriceId string.
 * @param priceId - The ID from Supabase or Lemon Squeezy.
 * @returns number - Defaults to 0 if ID is invalid or missing.
 */
export function getPriceFromId(priceId: string | null | undefined): number {
  if (!priceId) return 0;
  
  // Guard clause to ensure the ID exists in our registry
  if (Object.prototype.hasOwnProperty.call(PRICE_MAP, priceId)) {
    return PRICE_MAP[priceId as PriceId];
  }
  
  return 0;
}

/**
 * formatGBP: Converts number to the Kynar Universe currency format.
 * Pattern: £50 (Integers preferred for mobile clarity).
 */
export function formatGBP(amount: number): string {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      currencyDisplay: 'narrowSymbol', // Ensures clean '£' on all mobile OS
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fail-safe for legacy mobile browsers or edge-case locales
    return `£${amount}`;
  }
}

/**
 * calculateTotal: Securely sums a collection of product rows.
 * Primarily for use in Server Components and Checkout Actions.
 */
export function calculateTotal(items: { price_id?: string | null }[]): number {
  return items.reduce((total, item) => {
    return total + getPriceFromId(item.price_id);
  }, 0);
}

/**
 * validatePrice: Compares a client-provided price against the source of truth.
 * Usage: Security check within Next.js 15 Server Actions.
 */
export function validatePrice(id: string, providedPrice: number): boolean {
  const actualPrice = getPriceFromId(id);
  return actualPrice !== 0 && actualPrice === providedPrice;
}
