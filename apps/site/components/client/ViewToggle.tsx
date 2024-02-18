import { Button, Flex, Typography } from '@/design-system'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function ViewToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  return (
    <Flex className="gap-x-2">
      <Button
        className={
          searchParams.get('view') !== 'list'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
        variant="link"
        onClick={() => {
          router.replace(`${pathname}`)
        }}
      >
        <Typography
          className={
            searchParams.get('view') === 'list'
              ? 'text-secondary-foreground'
              : ''
          }
        >
          Grid
        </Typography>
      </Button>
      <Button
        className={
          searchParams.get('view') === 'list'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
        variant="link"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('view', 'list')}`)
        }}
      >
        <Typography
          className={
            searchParams.get('view') !== 'list'
              ? 'text-secondary-foreground '
              : ''
          }
        >
          List
        </Typography>
      </Button>
    </Flex>
  )
}
