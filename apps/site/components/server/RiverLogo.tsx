import { Button, Typography } from '@/design-system'
import Link from 'next/link'
import React from 'react'

export function RiverLogo() {
  return (
    <Link href={'/'} prefetch={false}>
      <Button variant="link" className="hover:no-underline">
        River
      </Button>
    </Link>
  )
}
