export {}

declare global {
  interface Window {
    createLemonSqueezy?: () => void
    LemonSqueezy?: {
      Setup: (options: { eventHandler: (event: { event: string }) => void }) => void
      Url: {
        Open: (url: string) => void
      }
    }
  }

  // Helper types for Supabase rows
  type ProductRow = Tables<'products'>
  type ProfileRow = Tables<'profiles'>
}
