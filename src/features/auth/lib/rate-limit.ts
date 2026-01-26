const rateLimitMap = new Map < string,
  { count: number;resetAt: number } > ()

export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
) {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (record && now > record.resetAt) {
    rateLimitMap.delete(identifier)
  }
  
  const currentRecord = rateLimitMap.get(identifier)
  
  if (!currentRecord) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs
    })
    return { success: true, remaining: limit - 1 }
  }
  
  if (currentRecord.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((currentRecord.resetAt - now) / 1000)
    }
  }
  
  currentRecord.count++
  return { success: true, remaining: limit - currentRecord.count }
}

export function cleanupRateLimits() {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetAt) rateLimitMap.delete(key)
  }
}

if (typeof window !== 'undefined') {
  setInterval(cleanupRateLimits, 300000)
}