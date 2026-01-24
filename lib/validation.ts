import { WORLDS } from './constants';

// Input validation utilities

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates that a string is a valid URL slug (lowercase, numbers, hyphens)
 */
export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Converts a string (like a Title) into a URL-friendly slug
 */
export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
}

export function validateUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Main validator for the ProductForm component
 */
export function validateProductData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Title Check
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  // Slug Check
  if (!data.slug) {
    errors.push('Slug is required');
  } else if (!validateSlug(data.slug)) {
    errors.push('Slug must be lowercase letters, numbers, and hyphens only');
  }

  // World Check - Using the centralized constant
  if (!WORLDS.includes(data.world)) {
    errors.push(`Invalid world. Must be one of: ${WORLDS.join(', ')}`);
  }

  // Category Check
  if (!data.category || data.category.trim().length < 2) {
    errors.push('Category is required');
  }

  // Price ID Check (Allows URL or specific IDs)
  if (data.price_id && data.price_id.length > 0) {
    const isUrl = validateUrl(data.price_id);
    const isShortCode = data.price_id.length > 3; // Basic length check for IDs
    
    if (!isUrl && !isShortCode) {
      errors.push('Price ID must be a valid checkout URL or variant code');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
