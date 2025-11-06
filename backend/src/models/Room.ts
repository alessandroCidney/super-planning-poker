import { mongoose } from '../db/conn'
import { userSchema } from './User'

const { Schema } = mongoose

export const roomSchema = new Schema(
  {
    users: [userSchema],
  },
  {
    timestamps: true,
  },
)

export const Room = mongoose.model(
  'Room',
  roomSchema,
)