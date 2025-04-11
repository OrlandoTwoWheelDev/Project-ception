import { Pool } from 'pg';
import dotenv from 'dotenv';
import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from '../src/utils/env';

dotenv.config();

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});

export { pool }; 