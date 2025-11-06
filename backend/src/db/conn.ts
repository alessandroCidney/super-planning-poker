import mongoose from 'mongoose'

async function startMongoose() {
  await mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
}

export { startMongoose, mongoose }
