import { Stack, Typography } from '@/design-system'
import { getUsername } from '@/lib'
import { cn } from '@/design-system'

export async function Username({ id }: { id: bigint }) {
  const username = await getUsername({ id: id })

  return (
    <Typography className="text-secondary-foreground leading-0">
      {username}
    </Typography>
  )
}
