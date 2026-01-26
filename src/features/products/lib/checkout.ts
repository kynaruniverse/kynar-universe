'use client'

/**
 * Global Type Guard for Lemon Squeezy JS
 */
declare global {
  interface Window {
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void
      }
      Setup: () => void
    }
  }
}

export interface CheckoutOptions {
  priceId: string
  userId?: string
  userEmail?: string
  onUnauthenticated: () => void
  embed?: boolean
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
    onUnauthenticated()
    return
  }

  // 2. Construct checkout URL
  const baseUrl = priceId.startsWith('http') 
    ? priceId 
    : `https://kynar.lemonsqueezy.com/checkout/buy/${priceId}`
  
  const checkoutUrl = new URL(baseUrl)
  
  /**
   * IMPORTANT: custom[user_id] is the bridge between the sale and your DB.
   */
  checkoutUrl.searchParams.set('checkout[custom][user_id]', userId)
  
  if (userEmail) {
    checkoutUrl.searchParams.set('checkout[email]', userEmail)
  }
  
  const finalUrl = checkoutUrl.toString()
  
  // 3. Open checkout
  if (typeof window !== 'undefined') {
    if (embed && window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(finalUrl)
    } else {
      window.location.href = finalUrl
    }
  }
}

export function saveCheckoutIntent(url: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('kynar_checkout_intent', url)
  }
}

export function getCheckoutIntent(): string | null {
  if (typeof window === 'undefined') return null
  
  const url = sessionStorage.getItem('kynar_checkout_intent')
  if (url) {
    sessionStorage.removeItem('kynar_checkout_intent')
  }
  return url
}
