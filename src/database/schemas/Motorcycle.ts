import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

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

export type Motorcycle = typeof motorcycleTable.$inferInsert
