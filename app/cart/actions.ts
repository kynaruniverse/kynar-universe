'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * 1. SECURE SERVER CLIENT
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
            // Handled by middleware
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handled by middleware
          }
        },
      },
    }
  );
}

/**
 * 2. THE CHECKOUT TRANSMISSION
 */
export async function processCheckout(productSlugs: string[]) {
  const supabase = await createClient();

  // A. IDENTITY VERIFICATION
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "unauthorized" }; // Handled by UI to redirect to login
  }

  if (!productSlugs || productSlugs.length === 0) {
    return { error: "Manifest empty. No assets to transmit." };
  }

  // B. DATA PREPARATION (Legal Compliance Audit Trail)
  // Ensures we record the EXACT moment the consumer waived their right to cancel
  const purchaseData = productSlugs.map(slug => ({
    user_id: user.id,
    product_id: slug, 
    legal_consent: true, // Aligned with your SQL column: legal_consent
    consent_at: new Date().toISOString() // Aligned with your SQL column: consent_at
  }));

  // C. DATABASE INSERTION (The Acquisition)
  const { error: dbError } = await supabase
    .from('purchases')
    .insert(purchaseData);

  if (dbError) {
    console.error("Transmission Error:", dbError.message);
    return { error: "The vault could not be opened. Please check your signal." };
  }

  // D. CACHE REVALIDATION
  // This ensures the /account page reflects the new items immediately
  revalidatePath('/account', 'page');
  revalidatePath('/marketplace', 'page');

  return { success: true };
}
