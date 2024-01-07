import { Typography } from '@/design-system'
import { cn } from '@/design-system'
import { getUsername } from '@/lib'

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
