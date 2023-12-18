import * as React from 'react'
import { Button, Typography, Loading } from '@/design-system'

// @ts-expect-error
import { useFormStatus } from 'react-dom'

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="link"
      className={pending ? 'pointer-events-none' : ''}
      disabled={pending}
    >
      pending ? <Loading /> :<Typography>{children}</Typography>
    </Button>
  )
}
