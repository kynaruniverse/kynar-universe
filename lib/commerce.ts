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
  const baseUrl = `https://kynar-universe.lemonsqueezy.com/checkout/buy/${variantId}`;
  
  // Create URL object to handle params cleanly
  const url = new URL(baseUrl);
  
  // 1. Force the checkout to be "clean" and branded
  url.searchParams.set('embed', '1');
  url.searchParams.set('media', '0'); // Hides LS product images to keep Kynar branding dominant
  
  // 2. Pre-fill email if user is logged in (Calm UX - less typing)
  if (userEmail) {
    url.searchParams.set('checkout[email]', userEmail);
  }

  // 3. CRITICAL: Pass the Supabase UID to the webhook
  if (userId) {
    url.searchParams.set('checkout[custom][user_id]', userId);
  }

  return url.toString();
};

/**
 * Redirects the user to the checkout page.
 * Standardizes how we leave the "Universe" for payment.
 */
export const redirectToCheckout = (options: CheckoutOptions) => {
  const checkoutUrl = getCheckoutUrl(options);
  window.location.href = checkoutUrl;
};
