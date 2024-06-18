import { defineConfig } from 'drizzle-kit'

import { Env } from './src/database/schemas/Env'

export default defineConfig({
  schema: ['./src/database/schemas/Motorcycle.ts'],
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_DATABASE,
  },
  verbose: true,
  strict: true,
})
