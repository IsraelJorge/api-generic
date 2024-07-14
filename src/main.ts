import fastify from 'fastify'

import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { Env } from './database/schemas/Env'
import { motorcycleRoutes } from './routes/motorcycleRoute'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: true,
})
app.register(formbody)

app.get('/', async (_, reply) => {
  return reply.send('Api running 🚀')
})

app.register(motorcycleRoutes)

app
  .listen({
    port: Env.API_PORT,
  })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${Env.API_PORT}`)
  })
