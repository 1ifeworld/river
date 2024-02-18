'use client'

import { Button, Stack, Typography } from '@/design-system'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ItemError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <Stack className="gap-y-3 justify-center items-center h-[calc(100dvh-38px)]">
      <Typography>Something went wrong</Typography>
      <Button
        onClick={() => router.back()}
        variant="link"
        className="underline underline-offset-2"
      >
        <Typography>Go back</Typography>
      </Button>
    </Stack>
  )
}
