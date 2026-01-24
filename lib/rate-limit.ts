// Client-side rate limiter for login attempts
// Note: This is "best effort" - server-side RLS is the real security

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
): { success: boolean; remaining: number; resetIn?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Auto-cleanup expired entries
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
    return { 
      success: false, 
      remaining: 0,
      resetIn: Math.ceil((currentRecord.resetAt - now) / 1000)
    };
  }

  currentRecord.count++;
  return { success: true, remaining: limit - currentRecord.count };
}

// Periodic cleanup to prevent memory leaks
let cleanupCounter = 0;
export function cleanupRateLimits() {
  cleanupCounter++;
  if (cleanupCounter > 50) {
    const now = Date.now();
    rateLimitMap.forEach((value, key) => {
      if (now > value.resetAt) {
        rateLimitMap.delete(key);
      }
    });
    cleanupCounter = 0;
  }
}