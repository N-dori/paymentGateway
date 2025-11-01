import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI 
if (!MONGODB_URI) {
  throw new Error("Please define MONGO_URI or MONGODB_URI in .env.local");
}

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: MongooseCache | undefined;
}

if (!global._mongoose) global._mongoose = { conn: null, promise: null };

export default async function connectMongoDB(): Promise<typeof mongoose> {
  if( !MONGODB_URI )return Promise.reject("mongo uri is not defined")
  if (global._mongoose!.conn) return global._mongoose!.conn;

  if (!global._mongoose!.promise) {
    global._mongoose!.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .then(() => mongoose)
      .catch((err) => {
        global._mongoose!.promise = null;
        throw err;
      });
  }

  const mongooseInstance = await global._mongoose!.promise;
  global._mongoose!.conn = mongooseInstance;
  return mongooseInstance;
}