'use server'

import { revalidatePath } from 'next/cache'

export async function revalidationHelper(paths: string[]) {
  for (let i = 0; i < paths.length; ++i) {
    revalidatePath(paths[i])
  }
}
