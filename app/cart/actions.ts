'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

/**
 * 1. SECURE SERVER CONTEXT
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
 * 2. ACQUISITION PROTOCOL
 * Processes the transfer of digital assets to the user's private library.
 */
export async function processCheckout(productSlugs: string[]) {
  const supabase = await createClient();

  // A. AUTHENTICATION CHECK
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "unauthorized" }; 
  }

  if (!productSlugs || productSlugs.length === 0) {
    return { error: "Your manifest is empty. No assets found for acquisition." };
  }

  // B. LEGAL AUDIT TRAIL (UK Compliance)
  // Records the formal consent and waiver of the cancellation period for digital goods.
  const purchaseData = productSlugs.map(slug => ({
    user_id: user.id,
    product_id: slug, 
    legal_consent: true, 
    consent_at: new Date().toISOString() 
  }));

  // C. ASSET TRANSFER (The Acquisition)
  const { error: dbError } = await supabase
    .from('purchases')
    .insert(purchaseData);

  if (dbError) {
    console.error("Acquisition Error:", dbError.message);
    return { error: "The acquisition could not be finalized. Please refresh and try again." };
  }

  // D. REGISTRY UPDATE
  // Ensures the Library and Storefront reflect the updated status immediately.
  revalidatePath('/account', 'page');
  revalidatePath('/marketplace', 'page');

  return { success: true };
}
