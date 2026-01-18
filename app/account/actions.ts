'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * 1. SECURE VAULT CLIENT
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
 * 2. ASSET RETRIEVAL PROTOCOL
 * Generates a short-lived, encrypted access point for verified library assets.
 */
export async function getDownloadLink(productSlug: string) {
  const supabase = await createClient();

  // A. IDENTITY AUTHENTICATION
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required. Please re-verify your identity." };

  // B. REGISTRY VERIFICATION
  // Validates ownership within the private user library.
  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productSlug)
    .single();

  if (purchaseError || !purchase) {
    return { error: "Access restricted. This asset is not registered to your library." };
  }

  // C. ASSET DISCOVERY
  const { data: product } = await supabase
    .from('products')
    .select('file_path, title, format')
    .eq('slug', productSlug)
    .single();

  if (!product || !product.file_path) {
    return { error: "Asset unavailable. Our curators have been notified." };
  }

  // D. ENCRYPTED ACCESS GENERATION
  // Sanitizes metadata to ensure a refined experience upon local storage.
  const safeTitle = product.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const extension = (product.format || 'pdf').toLowerCase();
  const downloadName = `${safeTitle}.${extension}`; 

  const { data, error } = await supabase
    .storage
    .from('vault')
    .createSignedUrl(product.file_path, 60, {
      download: downloadName, 
    });

  if (error || !data) {
    console.error("Vault Access Error:", error);
    return { error: "Internal Registry Error. The vault is currently under maintenance." };
  }

  return { url: data.signedUrl };
}
