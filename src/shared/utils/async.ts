/**
 * handleAsync
 * Wraps a promise to return a [data, error] tuple.
 * Allows for clean, flat async logic without deep try-catch nesting.
 */
export async function handleAsync<T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    const errorInstance = error instanceof Error 
      ? error 
      : new Error(String(error))
      
    return [null, errorInstance]
  }
}
