import type { ActionResult } from '@/lib/types'

/**
 * formatError
 * Wraps server errors to provide a consistent ActionResult response.
 */
export async function formatError(error: unknown): Promise<ActionResult<never>> {
  console.error('[Universe Error]:', error)

  if (error instanceof Error) {
    return { success: false, error: error.message }
  }
  
  return { 
    success: false, 
    error: 'An unexpected error occurred. Please try again.' 
  }
}
