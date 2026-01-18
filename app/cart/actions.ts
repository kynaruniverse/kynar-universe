'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * 1. SERVER-SIDE CLIENT INITIALIZATION
 */
async function createClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Managed by middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Managed by middleware
          }
        },
      },
    }
  );
}

/**
 * 2. CHECKOUT PROCESSING
 * Processes the purchase and links digital products to the user account.
 */
export async function processCheckout(productSlugs: string[]) {
  const supabase = await createClient();

  // A. AUTHENTICATION CHECK
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "unauthorized" }; 
  }

  if (!productSlugs || productSlugs.length === 0) {
    return { error: "Your cart is empty. No items found for purchase." };
  }

  // B. LEGAL AUDIT TRAIL (UK Compliance)
  // Records formal consent for digital goods and the waiver of the standard cancellation period.
  const purchaseData = productSlugs.map(slug => ({
    user_id: user.id,
    product_id: slug, 
    legal_consent: true, 
    consent_at: new Date().toISOString() 
  }));

  // C. DATA PROCESSING (The Purchase)
  const { error: dbError } = await supabase
    .from('purchases')
    .insert(purchaseData);

  if (dbError) {
    console.error("Checkout Error:", dbError.message);
    return { error: "The purchase could not be completed. Please refresh and try again." };
  }

  // D. CACHE REFRESH
  // Ensures the account library and storefront reflect the new purchase status.
  revalidatePath('/account', 'page');
  revalidatePath('/marketplace', 'page');

  return { success: true };
}
