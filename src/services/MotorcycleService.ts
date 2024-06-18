import { db } from '@/database/lib/drizzle'
import { Motorcycle, motorcycleTable } from '@/database/schemas/Motorcycle'

export class MotorcycleService {
  static async findAll() {
    const motorcycles = await db.select().from(motorcycleTable)

    return motorcycles
  }

  static async create(body: Motorcycle) {
    console.log({ body })

    const motorcycle = await db.insert(motorcycleTable).values(body).returning()

    return motorcycle
  }
}
