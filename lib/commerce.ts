/**
 * Kynar Universe Commerce Logic
 * Handles the secure bridge between our store and Lemon Squeezy.
 */

interface CheckoutOptions {
  variantId: string;
  userId?: string;
  userEmail?: string;
}

/**
 * Generates a Lemon Squeezy Checkout URL.
 * We pass the userId as a 'custom parameter' so our webhook can 
 * link the purchase to the correct Supabase profile.
 */
export const getCheckoutUrl = ({ variantId, userId, userEmail }: CheckoutOptions) => {
  // Defensive check: Ensure we have a variant ID
  if (!variantId) return '#';

  const baseUrl = `https://kynar-universe.lemonsqueezy.com/checkout/buy/${variantId}`;
  const url = new URL(baseUrl);
  
  /**
   * 1. THEMATIC EMBEDDING (Visual Guide 11.1)
   * We strip external media to keep the Kynar aesthetic dominant.
   */
  url.searchParams.set('embed', '1');
  url.searchParams.set('media', '0'); 
  url.searchParams.set('dark', '1'); // Force dark mode if supported by the LS theme
  
  /**
   * 2. PRE-FILL IDENTITY (Calm UX)
   * Reduces friction by remembering who the explorer is.
   */
  if (userEmail) {
    url.searchParams.set('checkout[email]', userEmail);
  }

  /**
   * 3. WEBHOOK HANDSHAKE (Architecture Alignment)
   * The 'custom' field is the payload our webhook (app/api/webhook/route.ts) 
   * will use to grant access.
   */
  if (userId) {
    url.searchParams.set('checkout[custom][user_id]', userId);
  }

  /**
   * 4. RETURN VECTOR
   * Standardizes the success path.
   */
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  url.searchParams.set('checkout[return_url]', `${siteUrl}/success`);

  return url.toString();
};

/**
 * Redirects the user to the checkout page.
 * Standardizes how we leave the "Universe" for payment.
 */
export const redirectToCheckout = (options: CheckoutOptions) => {
  const checkoutUrl = getCheckoutUrl(options);

  if (typeof window !== 'undefined' && checkoutUrl !== '#') {
    // We use window.location.href for a clean hand-off
    window.location.href = checkoutUrl;
  }
};
