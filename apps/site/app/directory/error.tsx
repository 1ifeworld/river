'use client'

import { Button, Stack, Typography } from '@/design-system'

export default function DirectoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Stack className="gap-4 justify-center items-center h-[calc(100dvh-72px)]">
      <Typography variant="h1">Something went wrong</Typography>
      <Button
        variant="link"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <Typography>Please try again</Typography>
      </Button>
    </Stack>
  )
}
