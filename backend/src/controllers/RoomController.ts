import { Request, Response } from 'express'

import { Room, roomSchema } from '../models/Room'
import { InferSchemaType } from 'mongoose'

export class RoomController {
  static async createRoom(req: Request<{}, {}, InferSchemaType<typeof roomSchema>>, res: Response) {  
    try {
      const { users } = req.body

      if (users.length !== 1) {
        throw new Error('Invalid users length')
      }

      if (!users[0]) {
        throw new Error('First user should be an owner')
      }

      const room = new Room({
        users,
      })

      const savedRoom = await room.save()

      res.status(201).json(savedRoom)
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : 'Internal server error',
      })
    }
  }
}
