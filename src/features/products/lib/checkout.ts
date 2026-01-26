'use client';

/**
 * Shared checkout utility for Lemon Squeezy integration
 */
export interface CheckoutOptions {
  priceId: string;
  userId?: string;
  userEmail?: string;
  onUnauthenticated: () => void;
  embed?: boolean;
}

/**
 * Opens the Lemon Squeezy checkout overlay or redirects if overlay is unavailable.
 */
export async function openCheckout({
  priceId,
  userId,
  userEmail,
  onUnauthenticated,
  embed = true,
}: CheckoutOptions): Promise<void> {
  // 1. Check authentication
  if (!userId) {
    onUnauthenticated();
    return;
  }

  // 2. Construct checkout URL
  // Ensure we use your specific store domain if priceId is just a variant ID
  const baseUrl = priceId.startsWith('http') 
    ? priceId 
    : `https://kynar.lemonsqueezy.com/checkout/buy/${priceId}`;
  
  const checkoutUrl = new URL(baseUrl);
  
  /**
   * IMPORTANT: 'checkout[custom][user_id]' is the key that allows
   * your webhook (api/webhook/route.ts) to attribute the sale to the user.
   */
  checkoutUrl.searchParams.set('checkout[custom][user_id]', userId);
  
  if (userEmail) {
    checkoutUrl.searchParams.set('checkout[email]', userEmail);
  }
  
  const finalUrl = checkoutUrl.toString();
  
  // 3. Open checkout
  if (typeof window !== 'undefined') {
    // If the Lemon Squeezy script is loaded and we want the embed (overlay)
    if (embed && window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(finalUrl);
    } else {
      // Fallback for mobile if script fails or embed is disabled
      window.location.href = finalUrl;
    }
  }
}

/**
 * Save checkout intent in sessionStorage so the user can be 
 * redirected back to their purchase after logging in.
 */
export function saveCheckoutIntent(url: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('kynar_checkout_intent', url);
  }
}

/**
 * Retrieve and clear the pending checkout intent.
 */
export function getCheckoutIntent(): string | null {
  if (typeof window === 'undefined') return null;
  
  const url = sessionStorage.getItem('kynar_checkout_intent');
  if (url) {
    sessionStorage.removeItem('kynar_checkout_intent');
  }
  return url;
}
