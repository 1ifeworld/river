import { Typography } from '@/design-system'
import Link from 'next/link'
import React from 'react'

export function IndexDirectory() {
  return (
    <Link href={'/indexDirectory'}>
      <Typography>Index</Typography>
    </Link>
  )
}
