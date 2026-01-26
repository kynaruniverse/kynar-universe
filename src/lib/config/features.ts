export const features = {
  cart: process.env.NEXT_PUBLIC_FEATURE_CART === 'true',
  socialLogin: process.env.NEXT_PUBLIC_FEATURE_SOCIAL === 'true',
  reviews: process.env.NEXT_PUBLIC_FEATURE_REVIEWS === 'true',
} as const;

export function isFeatureEnabled(feature: keyof typeof features): boolean {
  return features[feature];
}