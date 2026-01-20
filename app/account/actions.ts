'use server';

import { createClient } from '../../lib/supabase-server';

/**
 * 2. FILE DOWNLOAD SYSTEM
 * Generates a short-lived, secure download link for verified account items.
 */
export async function getDownloadLink(productSlug: string) {
  const supabase = await createClient();

  // A. USER VERIFICATION
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication required. Please sign in again." };

  // B. PURCHASE VALIDATION
  // Validates ownership within the user's personal account.
  const { data: purchase, error: purchaseError } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productSlug)
    .single();

  if (purchaseError || !purchase) {
    return { error: "Access restricted. This item is not linked to your account." };
  }

  // C. PRODUCT LOOKUP
  const { data: product } = await supabase
    .from('products')
    .select('file_path, title, format')
    .eq('slug', productSlug)
    .single();

  if (!product || !product.file_path) {
    return { error: "This file is currently unavailable. Contact support if the issue persists." };
  }

  // D. SECURE URL GENERATION
  // Sanitizes metadata for a clean filename upon download.
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
    console.error("Storage Access Error:", error);
    return { error: "System Error. Storage is currently undergoing maintenance." };
  }

  return { url: data.signedUrl };
}

export async function exportUserData(userId: string) {
  // Placeholder implementation for user data export
  return {
    profile: {},
    purchases: [],
    downloads: []
  };
}

export async function deleteAccount(userId: string) {
  const supabase = createClient();
  // Logic to handle account deletion or anonymization
  return { success: true };
}