'use client'

import { Stack, Button, Typography } from '@/design-system'

export default function ChannelError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Stack className="gap-5 justify-center items-center h-[calc(100dvh-72px)]">
      <div className="text-center">
        <Typography variant="h2">Something went wrong</Typography>
        <Typography className="text-red-500">{error.message}</Typography>
      </div>
      <Button
        variant="link"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Please try again
      </Button>
    </Stack>
  )
}
