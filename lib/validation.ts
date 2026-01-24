import { WORLDS } from './constants';

/**
 * Validates that a string is a valid URL slug (lowercase, numbers, hyphens)
 * No double hyphens allowed.
 */
function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Converts a string into a URL-friendly slug
 */
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-')         // Collapse multiple hyphens into one
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
}

function validateUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    // Ensure it's actually an HTTP/S link
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Main validator for Product Data
 */
export function validateProductData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 1. Title
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  // 2. Slug
  if (!data.slug) {
    errors.push('Slug is required');
  } else if (!validateSlug(data.slug)) {
    errors.push('Slug must use lowercase letters, numbers, and single hyphens');
  }

  // 3. World
  if (!data.world || !WORLDS.includes(data.world)) {
    errors.push('Please select a valid World from the list');
  }

  // 4. Category
  if (!data.category || data.category.trim().length < 2) {
    errors.push('Category is required (e.g., "Notion Template")');
  }

  // 5. Price ID (Lemon Squeezy Variant ID or Checkout URL)
  if (!data.price_id) {
    errors.push('Price ID or Checkout URL is required');
  } else {
    const isUrl = validateUrl(data.price_id);
    const isNumericId = /^\d+$/.test(data.price_id); // LS Variant IDs are often just numbers
    
    if (!isUrl && !isNumericId) {
      errors.push('Price ID must be a numeric Variant ID or a valid URL');
    }
  }

  // 6. Content URL (The actual digital asset)
  if (data.is_published && !validateUrl(data.content_url)) {
    errors.push('A valid Secure URL is required to publish this product');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
