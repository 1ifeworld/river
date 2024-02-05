'use server'

import { revalidatePath } from 'next/cache'

export async function revalidationHelper(tagToRevalidate: string) {
  revalidatePath(tagToRevalidate)
}
