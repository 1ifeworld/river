'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      toastOptions={{
        // unstyled: true,
        style: {
          borderRadius: '0px',
          padding: '8px 8px',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'none',
          fontSize: '0.71875rem',
        },
        // @ts-ignore
        classNames: {
          toast:
            'border-[0.5px] text-primary-foreground tracking-tight font-mono leading-[14px]',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
