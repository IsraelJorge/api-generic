import { FastifyRequest } from 'fastify'

import { db } from '@/database/drizzle'
import {
  Motorcycle,
  MotorcycleQuery,
  motorcycleTable,
} from '@/database/schemas/Motorcycle'
import { eq, ilike, or } from 'drizzle-orm'

import { PaginationService } from './PaginationService'

export class MotorcycleService {
  static async findAll({
    query,
  }: FastifyRequest<{ Querystring: MotorcycleQuery }>) {
    const { color, model, status, limit, page } = query

    try {
      const data = await PaginationService.withPagination({
        tableSelect: motorcycleTable,
        query: or(
          color ? ilike(motorcycleTable.color, `%${color}%`) : undefined,
          model ? ilike(motorcycleTable.model, `%${model}%`) : undefined,
          status ? eq(motorcycleTable.status, status) : undefined,
        ),
        page,
        limit,
      })

      return data
    } catch (error) {
      return error
    }
  }

  static async create(body: Motorcycle) {
    const motorcycle = await db.insert(motorcycleTable).values(body).returning()

    return motorcycle
  }
}
