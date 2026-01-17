'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * SECURE STORAGE CLIENT
 */
async function createClient() {
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

/**
 * THE KEY MASTER
 * Generates a short-lived, secure signature for digital assets.
 */
export async function getDownloadLink(productSlug: string) {
  const supabase = await createClient();

  // A. IDENTITY VERIFICATION
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Access Denied. Please re-verify your identity." };

  // B. OWNERSHIP VERIFICATION
  // We check the 'purchases' table to ensure this user owns this slug
  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productSlug)
    .single();

  if (purchaseError || !purchase) {
    return { error: "Transmission Blocked. This asset is not in your library." };
  }

  // C. ASSET LOCATION
  const { data: product } = await supabase
    .from('products')
    .select('file_path, title, format')
    .eq('slug', productSlug)
    .single();

  if (!product || !product.file_path) {
    return { error: "Asset not found in the vault. Support origin notified." };
  }

  // D. GENERATE SECURE SIGNATURE
  // We sanitize the filename so it looks professional when saved to a device
  const safeTitle = product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const extension = (product.format || 'pdf').toLowerCase();
  const downloadName = `${safeTitle}.${extension}`; 

  const { data, error } = await supabase
    .storage
    .from('vault')
    .createSignedUrl(product.file_path, 60, {
      download: downloadName, // Forces the file to download with the correct name
    });

  if (error || !data) {
    console.error("Vault Error:", error);
    return { error: "Could not mint access key. The vault is temporarily locked." };
  }

  return { url: data.signedUrl };
}
