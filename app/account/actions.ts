'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// 1. SETUP CLIENT
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

// 2. THE KEY MASTER FUNCTION
export async function getDownloadLink(productSlug: string) {
  const supabase = createClient();

  // A. Check User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // B. Verify Purchase (Security Check)
  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productSlug)
    .single();

  if (!purchase) return { error: "You do not own this product." };

  // C. Get File Path from Product Details
  const { data: product } = await supabase
    .from('products')
    .select('file_path')
    .eq('slug', productSlug)
    .single();

  if (!product || !product.file_path) {
    return { error: "File not found. Please contact support." };
  }

  // D. Mint the Key (Signed URL)
  // We ask the 'vault' bucket for a URL valid for 60 seconds
  const { data, error } = await supabase
    .storage
    .from('vault')
    .createSignedUrl(product.file_path, 60);

  if (error || !data) {
    return { error: "Could not generate download key." };
  }

  return { url: data.signedUrl };
}
