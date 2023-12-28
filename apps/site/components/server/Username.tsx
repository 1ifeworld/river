import { Typography } from '@/design-system'
import { getUsername } from '@/lib'
import { cn } from '@/design-system'

export async function Username({
  id,
  className,
}: { id: bigint; className?: string }) {
  const username = await getUsername({ id: id })

  return (
    <Typography className={cn('text-secondary-foreground', className)}>
      {username}
    </Typography>
  )
}
