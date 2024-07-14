import { FastifyInstance } from 'fastify'

import { MotorcycleController } from '@/controllers/MotorcycleController'
import { MotorcycleQuerySchema } from '@/database/schemas/Motorcycle'

async function motorcycleRoutes(app: FastifyInstance) {
  app.get(
    '/motorcycle',
    {
      schema: {
        querystring: MotorcycleQuerySchema,
      },
    },
    MotorcycleController.index,
  )
  app.post('/motorcycle', MotorcycleController.create)
  // app.get('/motorcycle/:id', MotorcycleController.show)
  // app.put('/motorcycle/:id', MotorcycleController.update)
  // app.delete('/motorcycle/:id', MotorcycleController.delete)
}

export { motorcycleRoutes }
