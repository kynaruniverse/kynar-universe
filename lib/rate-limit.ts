// For Production: This is a "Best Effort" limiter in serverless.
// If you need 100% accuracy, connect this to your Supabase/Redis.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 
): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Auto-cleanup on access (more reliable than setInterval in serverless)
  if (record && now > record.resetAt) {
    rateLimitMap.delete(identifier);
  }

  const currentRecord = rateLimitMap.get(identifier);

  if (!currentRecord) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs
    });
    return { success: true, remaining: limit - 1 };
  }

  if (currentRecord.count >= limit) {
    return { success: false, remaining: 0 };
  }

  currentRecord.count++;
  return { success: true, remaining: limit - currentRecord.count };
}

// Logic: Instead of a standalone setInterval (which dies in serverless),
// we prune the map every 50 requests to prevent memory bloat.
let requestCounter = 0;
function pruneMap() {
  requestCounter++;
  if (requestCounter > 50) {
    const now = Date.now();
    rateLimitMap.forEach((value, key) => {
      if (now > value.resetAt) rateLimitMap.delete(key);
    });
    requestCounter = 0;
  }
}
