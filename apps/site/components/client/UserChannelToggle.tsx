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
        variant="link"
        onClick={() => {
          router.replace(`${pathname}`)
        }}
        className={
          searchParams.get('view') === 'channel'
            ? 'decoration-secondary-foreground'
            : 'hover:no-underline'
        }
      >
        <Typography
          className={
            searchParams.get('view') === 'channel'
              ? 'text-secondary-foreground'
              : 'text-primary-foreground'
          }
        >
          Channel
        </Typography>
      </Button>
      <Button
        variant="link"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('view', 'user')}`)
        }}
        className={
          searchParams.get('view') === 'user'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
      >
        <Typography
          className={
            searchParams.get('view') === 'user'
              ? 'text-primary-foreground'
              : 'text-secondary-foreground'
          }
        >
          User
        </Typography>
      </Button>
    </Flex>
  )
}
