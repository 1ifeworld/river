import { Button, Flex, Typography } from '@/design-system'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function UserChannelToggle() {
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
    <Flex className="gap-x-4 p-20 items-center h-[14px]">
      <Button
              className={
                searchParams.get('view') !== 'user'
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
            searchParams.get('view') === 'user'
            ? 'text-secondary-foreground'
            : ''
          }
        >
          Channel
        </Typography>
      </Button>
      <Button
        className={
          searchParams.get('view') === 'user'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
        variant="link"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('view', 'user')}`)
        }}
      >
        <Typography
          className={
            searchParams.get('view') !== 'user'
              ? 'text-secondary-foreground'
              : ''
          }
        >
          User
        </Typography>
      </Button>
    </Flex>
  )
}
