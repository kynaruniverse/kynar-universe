import { supabase } from './supabase';

/**
 * Storage Logic: Secure Asset Delivery
 * Aligned with Brand Strategy 4.2: "Privacy by Design."
 */

/**
 * Generates a temporary, signed URL for a private file.
 * @param path - The path to the file within the 'vault' bucket (e.g., 'templates/planner-v1.pdf')
 * @param expiresIn - Seconds until the link expires (default: 60)
 */
export const getSignedDownloadUrl = async (path: string, expiresIn = 60) => {
  try {
    if (!path) throw new Error("File path is required.");

    const { data, error } = await supabase
      .storage
      .from('vault')
      .createSignedUrl(path, expiresIn);

    if (error) {
      console.error("Kynar Storage Error:", error.message);
      return null;
    }

    return data.signedUrl;
  } catch (err) {
    console.error("Unexpected Storage Failure:", err);
    return null;
  }
};

/**
 * Triggers a browser download for a signed URL.
 * Standardizes the 'Save to Device' experience.
 */
export const triggerDownload = async (path: string, fileName: string) => {
  const signedUrl = await getSignedDownloadUrl(path);

  if (signedUrl) {
    const link = document.createElement('a');
    link.href = signedUrl;
    link.download = fileName; // Suggests a clean filename to the browser
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert("The Vault could not verify this file. Please refresh or contact support.");
  }
};
