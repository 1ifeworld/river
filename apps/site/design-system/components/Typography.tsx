import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/design-system'

const typographyVariants = cva('text-primary-foreground tracking-tight', {
  variants: {
    variant: {
      h1: 'text-2xl',
      h2: 'text-xl',
      p: 'text-base leading-6',
      small: 'text-sm',
    },
  },
})

type VariantPropType = VariantProps<typeof typographyVariants>

const variantElementMap: Record<
  NonNullable<VariantPropType['variant']>,
  string
> = {
  h1: 'h1',
  h2: 'h2',
  p: 'p',
  small: 'small',
}

type Element = keyof JSX.IntrinsicElements

type TypographyProps<T extends Element> = {
  as?: T
} & VariantPropType &
  React.HTMLAttributes<HTMLElement>

export const Typography = React.forwardRef(
  <T extends Element>(
    { className, as, variant = 'p', ...props }: TypographyProps<T>,
    ref: React.Ref<T>,
  ) => {
    const Component =
      as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div'

    const componentProps = {
      className: cn(typographyVariants({ variant, className })),
      ...props,
      ref,
    }

    return React.createElement(Component, componentProps)
  },
)
