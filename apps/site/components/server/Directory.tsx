import { Typography } from '@/design-system'
import Link from 'next/link'

export function Directory() {
  return (
    <Link href={'/directory'}>
      <Typography className="text-secondary-foreground">Directory</Typography>
    </Link>
  )
}
