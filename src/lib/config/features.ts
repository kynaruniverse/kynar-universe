/**
 * Feature Flag Configuration
 * Pulls from .env.local via process.env
 */
export const features = {
  cart: process.env.NEXT_PUBLIC_FEATURE_CART === 'true',
  socialLogin: process.env.NEXT_PUBLIC_FEATURE_SOCIAL === 'true',
  reviews: process.env.NEXT_PUBLIC_FEATURE_REVIEWS === 'true',
} as const;

/**
 * Helper to check if a specific feature is active.
 * Usage: isFeatureEnabled('cart')
 */
export function isFeatureEnabled(feature: keyof typeof features): boolean {
  // Safety check: if the feature doesn't exist in the object, return false
  return !!features[feature];
}
