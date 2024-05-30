'use server'

import { pgPool } from '@/config/pgPool'

export async function getItemsWithUserId(createdById: number) {
  try {
    await pgPool.connect()
    const query =
      'SELECT COUNT(*) FROM "public"."Item" WHERE "createdById" = $1;'
    const res = await pgPool.query(query, [createdById])
    return { itemsWithUserId: res.rows[0].count }
  } catch (err) {
    console.error(err)
    return { itemsWithUserId: 0 } // Ensure a return on error
  }
}
