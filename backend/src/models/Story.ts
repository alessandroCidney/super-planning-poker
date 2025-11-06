import { mongoose } from '../db/conn'

const { Schema } = mongoose

export const storySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Story = mongoose.model(
  'Story',
  storySchema,
)