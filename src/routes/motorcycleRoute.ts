import { FastifyInstance } from 'fastify'

import { MotorcycleController } from '@/controllers/MotorcycleController'

async function motorcycleRoutes(app: FastifyInstance) {
  app.get('/motorcycle', MotorcycleController.index)
  app.post('/motorcycle', MotorcycleController.create)
  // app.get('/motorcycle/:id', MotorcycleController.show)
  // app.put('/motorcycle/:id', MotorcycleController.update)
  // app.delete('/motorcycle/:id', MotorcycleController.delete)
}

export { motorcycleRoutes }
