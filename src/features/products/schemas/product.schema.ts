import { z } from 'zod'

export const ProductWorldEnum = z.enum(['home', 'lifestyle', 'tools'])

export const ProductBaseSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  world: ProductWorldEnum,
  category: z.string().min(2),
  price_id: z.string().min(3),
  short_description: z.string().min(10),
  description: z.string().min(20),
  content_url: z.string().url().nullable(),
  preview_image: z.string().url().nullable(),
  tags: z.array(z.string()).min(1),
  file_types: z.array(z.string()).min(1),
  is_published: z.boolean(),
})

export const ProductInsertSchema = ProductBaseSchema
export const ProductUpdateSchema = ProductBaseSchema.partial()

export type Product = z.infer<typeof ProductBaseSchema>
export type ProductInsertInput = z.infer<typeof ProductInsertSchema>
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>

export const ProductFormSchema = ProductBaseSchema.extend({
  id: z.string().optional(),
})
