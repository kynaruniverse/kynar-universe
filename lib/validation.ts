// Input validation utilities

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateProductData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters');
  }

  if (!data.slug || !validateSlug(data.slug)) {
    errors.push('Slug must be lowercase letters, numbers, and hyphens only');
  }

  if (!['Home', 'Lifestyle', 'Tools'].includes(data.world)) {
    errors.push('Invalid world selection');
  }

  if (data.price_id && !validateUrl(data.price_id) && !data.price_id.match(/^[a-f0-9-]{36}$/)) {
    errors.push('Price ID must be a valid URL or UUID');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}