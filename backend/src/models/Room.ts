import { mongoose } from '../db/conn'
import { storySchema } from './Story'
import { userSchema } from './User'

const { Schema } = mongoose

export const roomSchema = new Schema(
  {
    users: [userSchema],
    stories: [storySchema],
  },
  {
    timestamps: true,
  },
)

export const Room = mongoose.model(
  'Room',
  roomSchema,
)