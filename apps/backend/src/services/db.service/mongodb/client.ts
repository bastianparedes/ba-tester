import importedMongoose from 'mongoose';
import { env } from '@/libs/env';

declare global {
  var mongoose: {
    conn: typeof importedMongoose | null;
    promise: Promise<typeof importedMongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 2,
      maxIdleTimeMS: 60000,
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, //Stay within Vercel's 10 second function limit
      heartbeatFrequencyMS: 10000, //Attempting to see if this reduces query timeouts
    };

    console.log('---Connecting to MongoDB---');

    try {
      cached.promise = importedMongoose.connect(env.DATABASE_URL_MONGODB, opts).then((mongooseInstance) => {
        console.log('---Connected!---');
        return mongooseInstance;
      });
    } catch (e) {
      console.log('---Error connecting to MongoDB---', e);
      throw new Error('Error connecting to database');
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export async function disconnect() {
  if (!cached.conn) {
    return;
  }

  console.log('---Disconnecting from MongoDB---');

  await importedMongoose.disconnect();

  cached.conn = null;
  cached.promise = null;

  console.log('---Disconnected!---');
}
