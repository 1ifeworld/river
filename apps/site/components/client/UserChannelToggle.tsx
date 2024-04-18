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
    <Stack className="hidden md:flex gap-y-[34px]">
      <Stack className="gap-y-[3px]">
      <Button
              className={
                searchParams.get('view') !== 'user'
                ? 'p-5 hover:no-underline'
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
            ? 'p-5 text-secondary-foreground'
            : ''
          }
        >
          Channel
        </Typography>
      </Button>
      <Button
        className={
          searchParams.get('view') === 'user'
            ? 'p-5 hover:no-underline'
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
              ? 'p-5 text-secondary-foreground'
              : ''
          }
        >
          User
        </Typography>
      </Button>
    </Stack>
    </Stack>
  )
}
