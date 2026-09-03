import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export function isDbConnected(): boolean {
  return (mongoose.connection.readyState as number) === 1;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  if ((mongoose.connection.readyState as number) === 1) {
    return mongoose;
  }

  if (!MONGODB_URI) {
    return null;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 3000, // Fast timeout if auth or network fails
      bufferCommands: false,
    };

    mongoose.set('bufferCommands', false);

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn('MongoDB connection unavailable:', err.message);
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.conn || (mongoose.connection.readyState as number) !== 1) {
      cached.promise = null;
      return null;
    }
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;
