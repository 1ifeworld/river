import { useState, useEffect } from 'react'
import { Typography } from '@/design-system'
import { cn } from '@/design-system'
import { getUsername } from '@/lib'
import Link from 'next/link'

export function ClientUsername({
  id,
  className,
}: { id: bigint; className?: string }) {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await getUsername({ id })
        setUsername(fetchedUsername)
      } catch (error) {
        console.error('Error fetching username:', error)
      }
    }

    if (id) {
      fetchUsername()
    }
  }, [id])

  return (
    // <Link
    //   href={`/${username}`}
    //   className="hover:underline underline-offset-2 transition-all decoration-secondary-foreground w-fit"
    // >
    <Typography className={cn('text-secondary-foreground', className)}>
      {username ? username : 'loading...'}
    </Typography>
    // </Link>
  )
}
