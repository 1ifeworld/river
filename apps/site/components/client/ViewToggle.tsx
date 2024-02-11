import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Flex, Typography, Button } from '@/design-system'
import { useCallback } from 'react'

export function ViewToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
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
          searchParams.get('view') !== 'grid'
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
            searchParams.get('view') === 'grid'
              ? 'text-secondary-foreground'
              : ''
          }
        >
          List
        </Typography>
      </Button>
      <Button
        className={
          searchParams.get('view') === 'grid'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
        variant="link"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('view', 'grid')}`)
        }}
      >
        <Typography
          className={
            searchParams.get('view') !== 'grid'
              ? 'text-secondary-foreground '
              : ''
          }
        >
          Grid
        </Typography>
      </Button>
    </Flex>
  )
}
