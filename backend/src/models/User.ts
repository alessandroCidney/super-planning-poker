import { mongoose } from '../db/conn'

const { Schema } = mongoose

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    owner: {
      type: Boolean,
      required: true,
    },

    online: {
      type: Boolean,
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