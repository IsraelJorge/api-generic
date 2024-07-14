import { db } from '@/database/drizzle'
import { PaginationSchema } from '@/shared/schemas/Pagination'
import { SQL, sql } from 'drizzle-orm'
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core'

type PaginationParams<T extends TableConfig> = {
  tableSelect: PgTableWithColumns<T>
  query?: SQL
  page?: number
  limit?: number
}

export class PaginationService {
  static async withPagination<T extends TableConfig>({
    tableSelect,
    query,
    page = 1,
    limit = 10,
  }: PaginationParams<T>) {
    const offset = (page - 1) * limit

    const [data, [{ total }]] = await Promise.all([
      db.select().from(tableSelect).where(query).offset(offset).limit(limit),
      db
        .select({ total: sql<number>`count(*)` })
        .from(tableSelect)
        .where(query),
    ])

    const result = PaginationSchema.parse({
      data,
      meta: { page, limit, total },
    })

    return result
  }
}
