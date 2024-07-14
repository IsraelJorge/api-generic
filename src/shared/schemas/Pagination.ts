import { z } from 'zod'

export const MetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.coerce.number(),
})

export const PageParamsSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
})

export const PaginationSchema = z.object({
  data: z.array(z.any()),
  meta: MetaSchema,
})
