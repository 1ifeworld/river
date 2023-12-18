import * as React from 'react'
import { Button, Typography, Loading } from '@/design-system'
import { ComponentProps } from 'react'
// @ts-expect-error
import { useFormStatus } from 'react-dom'

type ButtonProps = ComponentProps<typeof Button>

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode
}

export function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={pending ? 'pointer-events-none' : ''}
      disabled={pending}
      {...props}
    >
      {pending ? <Loading /> : <Typography>{children}</Typography>}
    </Button>
  )
}
