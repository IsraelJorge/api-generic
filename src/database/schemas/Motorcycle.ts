import { PageParamsSchema } from '@/shared/schemas/Pagination'
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const statusEnum = pgEnum('status', [
  'in_stock',
  'out_of_stock',
  'in_transit',
])

export const motorcycleTable = pgTable('motorcycle', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code').unique().notNull(),
  model: varchar('model').notNull(),
  price: integer('price').notNull(),
  color: varchar('color').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const MotorcycleSchema = createInsertSchema(motorcycleTable)
export const MotorcycleStatusSchema = z.enum(statusEnum.enumValues)

export type Motorcycle = typeof motorcycleTable.$inferInsert

export const MotorcycleQuerySchema = PageParamsSchema.extend({
  model: z.string().optional(),
  color: z.string().optional(),
  status: MotorcycleStatusSchema.optional(),
})

export type MotorcycleQuery = z.infer<typeof MotorcycleQuerySchema>
