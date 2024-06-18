import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Client } from 'pg'

import { Env } from './schemas/Env'

async function runMigrate() {
  const client = new Client({
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_DATABASE,
  })

  await client.connect()
  const db = drizzle(client)

  await migrate(db, { migrationsFolder: './src/database/migrations' })
  await client.end()
  console.log('Migration complete 🚀')
}

runMigrate()
