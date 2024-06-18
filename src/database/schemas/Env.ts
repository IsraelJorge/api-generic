import { z } from 'zod'

export const EnvSchema = z.object({
  API_PORT: z.coerce.number(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
})

export const Env = EnvSchema.parse(process.env)
