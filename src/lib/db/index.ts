import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

neonConfig.fetchConnectionCache = true;

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE URL is not defined")
}

const sql = neon(DATABASE_URL);

export const db = drizzle(sql)