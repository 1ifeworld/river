import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      toastOptions={{
        unstyled: true,
        // @ts-ignore
        classNames: {
          toast:
            'w-60 bg-background border-[0.5px] px-4 py-2 text-primary-foreground tracking-tight font-sans text-base leading-[14px]',
        },
      }}
      {...props}
    />
  )
}
