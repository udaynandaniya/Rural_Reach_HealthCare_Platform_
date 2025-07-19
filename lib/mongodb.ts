///C:\Users\UDAYN\Downloads\healthcare-platform\lib\mongodb.ts

import mongoose from "mongoose"

mongoose.connection.on("connected", () => {
  //console.log("MongoDB connected to", mongoose.connection.name)
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})


const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
