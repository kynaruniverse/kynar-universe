// lib/storage.ts

import { supabase } from './supabaseClient';

const DOWNLOAD_EXPIRY = 3600; // 1 hour
const MAX_DOWNLOADS_PER_PURCHASE = 10;

interface TrackedDownloadResult {
  url: string;
  remainingDownloads: number;
}

/**
 * Creates a tracked download for a purchased digital product.
 * @param purchaseId - The unique ID of the purchase
 * @param filePath - Path of the file in Supabase Storage
 * @returns Signed URL + remaining downloads
 */
export async function createTrackedDownload(
  purchaseId: string,
  filePath: string
): Promise<TrackedDownloadResult> {
  // 1. Fetch all download records for this purchase
  const { data: downloads, error: fetchError } = await supabase
    .from('downloads')
    .select('*')
    .eq('purchase_id', purchaseId);

  if (fetchError) throw fetchError;

  const downloadsSoFar = downloads?.length || 0;

  // 2. Check if max downloads reached
  if (downloadsSoFar >= MAX_DOWNLOADS_PER_PURCHASE) {
    throw new Error('Maximum downloads reached for this purchase');
  }

  // 3. Generate a signed URL for secure download
  const { data: signedData, error: signedError } = await supabase
    .storage
    .from('digital-products')
    .createSignedUrl(filePath, DOWNLOAD_EXPIRY);

  if (signedError || !signedData) throw signedError || new Error('Failed to generate signed URL');

  // 4. Log the download event
  const { error: logError } = await supabase.from('downloads').insert({
    purchase_id: purchaseId,
    file_path: filePath,
    downloaded_at: new Date().toISOString(),
  });

  if (logError) throw logError;

  // 5. Return signed URL + remaining downloads
  return {
    url: signedData.signedUrl,
    remainingDownloads: MAX_DOWNLOADS_PER_PURCHASE - (downloadsSoFar + 1),
  };
}