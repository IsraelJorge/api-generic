import { faker } from '@faker-js/faker'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

import { Env } from './schemas/Env'
import {
  Motorcycle,
  MotorcycleStatusSchema,
  motorcycleTable,
} from './schemas/Motorcycle'

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export function makeDataTable<T>(callback: () => T, lens: number) {
  return range(lens).map((): T => callback())
}

const newMotorcycle = (): Motorcycle => {
  return {
    id: faker.string.uuid(),
    price: faker.number.float({ min: 100, max: 10000, fractionDigits: 2 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    code: faker.vehicle.vrm(),
    model: faker.vehicle.model(),
    color: faker.vehicle.color(),
    status: faker.helpers.enumValue(MotorcycleStatusSchema.Values),
  }
}

async function seed() {
  const client = new Client({
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_DATABASE,
  })

  await client.connect()
  const db = drizzle(client)

  const motorcycles = makeDataTable(newMotorcycle, 100)

  await db.insert(motorcycleTable).values(motorcycles).execute()

  console.log('motorcycles completed 🚀')

  await client.end()
}

seed()
