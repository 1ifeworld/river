'server-only'

import pg from 'pg'

const { Pool } = pg

export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
