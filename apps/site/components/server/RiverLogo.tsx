import React from 'react'
import Link from 'next/link'
import { Typography } from '@/design-system'

export function RiverLogo() {
  return (
    <Link href={'/'} prefetch={false}>
      <Typography>River</Typography>
    </Link>
  )
}
