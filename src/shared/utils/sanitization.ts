/**
 * sanitizeSlug
 * Cleans a string to be used as a URL-friendly slug.
 */
export function sanitizeSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start
    .replace(/-+$/, '')       // Trim - from end
}

/**
 * parseCommaSeparated
 * Converts a comma-separated string into a clean array of unique strings.
 */
export function parseCommaSeparated(input: string): string[] {
  if (!input) return []
  
  const items = input
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '')
    
  return [...new Set(items)] // Efficient way to remove duplicates
}
