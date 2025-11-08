import dotenv from 'dotenv';

dotenv.config();

const config: { dbURL: string; dbName: string } = {
  dbURL: process.env.ATLAS_DB_URL ?? '',
  dbName: process.env.ATLAS_DB_NAME ?? '',
};

export default config;