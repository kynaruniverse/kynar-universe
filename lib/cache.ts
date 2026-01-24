// Simple in-memory cache for Client-side or Edge state
// Note: In Serverless/Next.js 15, use 'unstable_cache' for server-side persistence

const cache = new Map < string,
  { data: any;timestamp: number } > ();
const DEFAULT_TTL = 60 * 1000; // 1 minute

export function getCached < T > (key: string): T | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > DEFAULT_TTL;
  if (isExpired) {
    cache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

export function setCache < T > (key: string, data: T): void {
  // Prevent the cache from growing infinitely on the client
  if (cache.size > 100) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
  
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

/**
 * Clears specific keys or the whole cache.
 * Useful after a successful purchase or an admin edit.
 */
export function clearCache(keyOrPattern ? : string): void {
  if (!keyOrPattern) {
    cache.clear();
    return;
  }
  
  // If we pass 'products', it will clear 'products-home', 'products-store', etc.
  for (const key of cache.keys()) {
    if (key.includes(keyOrPattern)) {
      cache.delete(key);
    }
  }
}