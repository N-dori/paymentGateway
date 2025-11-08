import { MongoClient, Db, Collection,Document } from 'mongodb';
import config from '../config';
import logger from './logger.service';

let dbConn: Db | null = null;
let client: MongoClient | null = null;

/**
 * Return a MongoDB Collection instance
 */
export async function getCollection<T extends { _id?: any }>(collectionName: string): Promise<Collection<T>> {
  try {
    const db = await connect();
    return db.collection<T>(collectionName);
  } catch (err) {
    logger.error('Failed to get Mongo collection', err);
    throw err;
  }
}

/**
 * Establish and cache a DB connection (singleton)
 */
async function connect(): Promise<Db> {
  if (dbConn) return dbConn;

  try {
    const url: string = config.dbURL;
    const dbName: string = config.dbName;

    // create client if not created yet
    if (!client) {
      client = new MongoClient(url, {
        // recommended options
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      } as any);
    }

    // Always ensure the client is connected. calling connect() is safe even if already connected.
    await client.connect();

    dbConn = client.db(dbName);
    return dbConn;
  } catch (err) {
    logger.error('Cannot Connect to DB', err);
    // reset cached client so future calls can retry
    client = null;
    dbConn = null;
    throw err;
  }
}

export default {
  getCollection,
};