import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import { Env } from '../schemas/Env'

class Drizzle {
  private static db: NodePgDatabase<Record<string, never>> | null = null

  private constructor() {}

  static getInstance() {
    if (this.db === null) {
      const pool = new Pool({
        host: Env.DB_HOST,
        port: Env.DB_PORT,
        user: Env.DB_USERNAME,
        password: Env.DB_PASSWORD,
        database: Env.DB_DATABASE,
      })

      this.db = drizzle(pool)

      return this.db
    }

    return this.db
  }
}

export const db = Drizzle.getInstance()
