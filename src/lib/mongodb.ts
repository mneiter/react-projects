import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

if (!MONGODB_URI) {
  throw new Error('❌ MongoDB connection string is missing.');
}

// Reuse connection in dev to avoid too many connections
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'todo-app',
      })
      .then((mongoose) => {
        console.log('✅ Connected to MongoDB');
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
