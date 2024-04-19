import { Button, Flex, Typography, Stack } from '@/design-system'
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
    <Stack className="items-start gap-y-2">
      <Button
        // className={
        //   searchParams.get('view') !== 'user'
        //     ? 'hover:no-underline'
        //     : 'decoration-secondary-foreground'
        // }
        className={`h-4 ${
          searchParams.get('view') !== 'user'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }`}
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
          Channels
        </Typography>
      </Button>
      <Button
        className={`h-4  ${
          searchParams.get('view') === 'user'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }`}
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
          Users
        </Typography>
      </Button>
    </Stack>
  )
}
