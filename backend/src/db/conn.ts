import mongoose from "mongoose"

async function startMongoose() {
  await mongoose.connect('mongodb://localhost:27017/...')
}

export { mongoose }
