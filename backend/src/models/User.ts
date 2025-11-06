import { mongoose } from '../db/conn'

const { Schema } = mongoose

export const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model(
  'User',
  userSchema,
)