import { Typography } from '@/design-system'
import Link from 'next/link'
import React from 'react'

export function RiverLogo() {
  return (
    <Link href={'/'}>
      <Typography className="hover:underline underline-offset-2 transition-all">
        River
      </Typography>
    </Link>
  )
}
