'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 1. HELPER: CONNECT TO DB SECURELY
function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          try { cookieStore.set({ name, value, ...options }); } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try { cookieStore.set({ name, value: '', ...options }); } catch (error) {}
        },
      },
    }
  );
}

// 2. THE CHECKOUT FUNCTION
export async function processCheckout(productSlugs: string[]) {
  const supabase = createClient();

  // A. Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: "You must be logged in to checkout." };
  }

  // B. Prepare the "Receipts" (Rows to insert)
  // We map each product slug to a new row in the database
  const purchases = productSlugs.map(slug => ({
    user_id: user.id,
    product_id: slug, // Saving the slug (e.g., 'kynar-ultimate-guide')
  }));

  // C. Insert into Database
  const { error } = await supabase
    .from('purchases')
    .insert(purchases);

  if (error) {
    console.error("Checkout Error:", error);
    return { error: "Failed to process order. Please try again." };
  }

  return { success: true };
}
