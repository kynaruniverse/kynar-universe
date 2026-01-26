import { ActionResult } from '@/lib/types/models/actions';

/**
 * Wraps a server action to provide a consistent error response.
 */
export async function formatError(error: unknown): Promise<ActionResult<never>> {
  console.error('[Server Error]:', error);

  if (error instanceof Error) {
    return { success: false, error: error.message };
  }
  
  return { 
    success: false, 
    error: 'An unexpected error occurred. Please try again.' 
  };
}
