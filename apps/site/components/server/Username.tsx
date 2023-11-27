import { Stack, Typography } from '@/design-system'
import { getUsername } from '@/lib'

export async function Username({ id }: { id: bigint }) {
  const username = await getUsername({ id: id })

  return <Typography>{username.username}</Typography>
}
