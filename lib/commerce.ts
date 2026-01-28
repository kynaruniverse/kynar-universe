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
  
  // 1. Force the checkout to be "clean" and branded (Visual Guide 11.1)
  url.searchParams.set('embed', '1');
  url.searchParams.set('media', '0'); // Hides LS product images to keep Kynar branding dominant
  
  // 2. Pre-fill email if user is logged in (Calm UX - Brand Language 3.1)
  if (userEmail) {
    url.searchParams.set('checkout[email]', userEmail);
  }

  // 3. CRITICAL: Pass the Supabase UID to the webhook (Architecture Alignment)
  if (userId) {
    url.searchParams.set('checkout[custom][user_id]', userId);
  }

  // 4. Return the user to the Library upon success (Netlify Readiness)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kynar.netlify.app';
  url.searchParams.set('checkout[return_url]', `${siteUrl}/library`);

  return url.toString();
};

/**
 * Redirects the user to the checkout page.
 * Standardizes how we leave the "Universe" for payment.
 */
export const redirectToCheckout = (options: CheckoutOptions) => {
  // Defensive check for variantId
  if (!options.variantId) {
    console.error("Kynar Error: No Variant ID provided for checkout.");
    return;
  }

  const checkoutUrl = getCheckoutUrl(options);

  // Safety check for Client-Side execution (Next.js 15 Compatibility)
  if (typeof window !== 'undefined') {
    window.location.href = checkoutUrl;
  }
};
