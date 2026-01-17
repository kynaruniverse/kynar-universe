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
  // Matches user ID against the purchases sector
  const { data: purchase } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productSlug)
    .single();

  if (!purchase) {
    return { error: "Transmission Blocked. This asset is not in your library." };
  }

  // C. ASSET LOCATION
  const { data: product } = await supabase
    .from('products')
    .select('file_path, title')
    .eq('slug', productSlug)
    .single();

  if (!product || !product.file_path) {
    return { error: "Asset not found in the vault. Contacting support recommended." };
  }

  // D. GENERATE SECURE SIGNATURE
  // Sanitize filename for mobile file systems (No spaces/special chars)
  const safeTitle = product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const filename = `${safeTitle}.pdf`; 

  const { data, error } = await supabase
    .storage
    .from('vault')
    .createSignedUrl(product.file_path, 60, {
      download: filename, // Forces the 'Save As' dialogue on mobile
    });

  if (error || !data) {
    console.error("Vault Error:", error);
    return { error: "Could not mint access key. Please try again." };
  }

  return { url: data.signedUrl };
}
