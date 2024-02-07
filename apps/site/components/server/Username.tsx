import { Typography } from '@/design-system'
import { cn } from '@/design-system'
import { getUsername } from '@/lib'
import Link from 'next/link'

export async function Username({
  id,
  className,
}: { id: bigint; className?: string }) {
  const username = await getUsername({ id: id })
  return (
    <Link
      href={`/${username}`}
      className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground w-fit"
    >
      <Typography className={cn('text-secondary-foreground', className)}>
        {username}
      </Typography>
    </Link>
  )
}
