import { FastifyReply, FastifyRequest } from 'fastify'

import { Motorcycle, MotorcycleQuery } from '@/database/schemas/Motorcycle'
import { MotorcycleService } from '@/services/MotorcycleService'

export class MotorcycleController {
  static async index(
    request: FastifyRequest<{ Querystring: MotorcycleQuery }>,
    reply: FastifyReply,
  ) {
    try {
      const motorcycles = await MotorcycleService.findAll(request)

      return reply.send(motorcycles)
    } catch (error) {
      reply.status(500).send({ error })
    }
  }
  static async create(
    request: FastifyRequest<{ Body: Motorcycle }>,
    reply: FastifyReply,
  ) {
    try {
      const { body } = request

      const motorcycle = await MotorcycleService.create(body)

      return reply.send(motorcycle)
    } catch (error) {
      reply.status(500).send({ error })
    }
  }
}
