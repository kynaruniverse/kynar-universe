import { Database } from './database'

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type World = 'Home' | 'Lifestyle' | 'Tools'

export type Product = Tables<'products'>
export type Profile = Tables<'profiles'>
export type Purchase = Tables<'purchases'> & {
  product?: Product
}
