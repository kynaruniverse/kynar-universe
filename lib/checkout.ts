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

export async function openCheckout({
  priceId,
  userId,
  userEmail,
  onUnauthenticated,
  embed = true, // Defaulting to true for that premium Kynar feel
}: CheckoutOptions): Promise<void> {
  // 1. Check authentication
  if (!userId) {
    onUnauthenticated();
    return;
  }

  // 2. Construct checkout URL
  const baseUrl = priceId.startsWith('http') 
    ? priceId 
    : `https://store.lemonsqueezy.com/checkout/buy/${priceId}`;
  
  const checkoutUrl = new URL(baseUrl);
  
  /**
   * IMPORTANT: Lemon Squeezy uses 'checkout[custom][user_id]' 
   * to pass data back to your webhooks.
   */
  checkoutUrl.searchParams.set('checkout[custom][user_id]', userId);
  
  if (userEmail) {
    checkoutUrl.searchParams.set('checkout[email]', userEmail);
  }
  
  // LS specific: pre-fill to hide the email field if they are logged in
  // checkoutUrl.searchParams.set('checkout[prefill_email]', '1'); 

  // 3. Open checkout
  const finalUrl = checkoutUrl.toString();
  
  /**
   * Check for the global LS object.
   * If the script is loaded, use the overlay; otherwise, fallback to redirect.
   */
  if (typeof window !== 'undefined' && window.LemonSqueezy?.Url?.Open) {
    window.LemonSqueezy.Url.Open(finalUrl);
  } else {
    window.location.href = finalUrl;
  }
}

/**
 * Save checkout intent
 */
export function saveCheckoutIntent(url: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('kynar_checkout_intent', url);
  }
}

/**
 * Get and Clear intent
 */
export function getCheckoutIntent(): string | null {
  if (typeof window === 'undefined') return null;
  
  const url = sessionStorage.getItem('kynar_checkout_intent');
  if (url) {
    sessionStorage.removeItem('kynar_checkout_intent');
  }
  return url;
}
