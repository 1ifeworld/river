import React from 'react'
import Link from 'next/link'
import { Typography, Button } from '@/design-system'

export function RiverLogo() {
  return (
    <Link href={'/'} prefetch={false}>
      <Button variant="link" className="hover:no-underline">
        River
      </Button>
    </Link>
  )
}
