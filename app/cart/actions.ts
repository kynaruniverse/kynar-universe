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
    return { error: "Authentication required. Please log in to your Kynar account." };
  }

  if (!productSlugs || productSlugs.length === 0) {
    return { error: "Your manifest is empty. No items to transmit." };
  }

  // B. DATA PREPARATION (Including Legal Evidence)
  const purchaseData = productSlugs.map(slug => ({
    user_id: user.id,
    product_id: slug, // Matches the 'product_id' column in your SQL
    purchased_at: new Date().toISOString(),
    legal_consent_given: true,
    consent_timestamp: new Date().toISOString()
  }));

  // C. DATABASE INSERTION
  const { error: dbError } = await supabase
    .from('purchases')
    .insert(purchaseData);

  if (dbError) {
    console.error("Transmission Interrupted:", dbError.message);
    return { error: "The universe is experiencing turbulence. Please try again shortly." };
  }

  // D. CACHE REVALIDATION
  revalidatePath('/account');
  revalidatePath('/marketplace');

  return { success: true };
}
