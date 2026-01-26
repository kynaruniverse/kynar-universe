/**
 * Standardized Server Action Response
 * Prevents accessing 'data' if 'success' is false
 */
export type ActionResult<T = void> = 
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never }
