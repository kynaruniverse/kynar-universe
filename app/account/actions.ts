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

// 2. THE KEY MASTER FUNCTION (UPDATED)
export async function getDownloadLink(productSlug: string) {
  const supabase = createClient();

  // A. Check User
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // B. Verify Purchase
  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productSlug)
    .single();

  if (!purchase) return { error: "You do not own this product." };

  // C. Get File Path
  const { data: product } = await supabase
    .from('products')
    .select('file_path, title') // Added title to name the file correctly
    .eq('slug', productSlug)
    .single();

  if (!product || !product.file_path) {
    return { error: "File not found. Please contact support." };
  }

  // D. Mint the Key (FORCE DOWNLOAD)
  // We use the product title as the filename
  const filename = `${product.title}.pdf`; 

  const { data, error } = await supabase
    .storage
    .from('vault')
    .createSignedUrl(product.file_path, 60, {
      download: filename, // <--- THIS FORCES THE BROWSER TO SAVE IT
    });

  if (error || !data) {
    return { error: "Could not generate download key." };
  }

  return { url: data.signedUrl };
}
