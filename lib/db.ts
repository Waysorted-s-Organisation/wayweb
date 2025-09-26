import mongoose, { Mongoose } from "mongoose";

const { MONGODB_URI } = process.env;
// Avoid throwing during build when env vars may be absent; defer error until actual connection attempt
// This allows Next.js static/build time to proceed without a runtime-only secret.

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

const globalCache = global._mongooseConn || { conn: null, promise: null };
global._mongooseConn = globalCache;

export async function dbConnect(): Promise<Mongoose> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(MONGODB_URI as string, {
        bufferCommands: false,
      })
      .then((m) => m);
  }

  try {
    globalCache.conn = await globalCache.promise;
  } catch (e) {
    globalCache.promise = null;
    throw e;
  }
  return globalCache.conn;
}

export default dbConnect;