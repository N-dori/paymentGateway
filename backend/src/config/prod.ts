import dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

const config: Config = {
  dbURL: process.env.ATLAS_DB_URL || '',
  dbName: process.env.ATLAS_DB_NAME || ''
};

export default config;