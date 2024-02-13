import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Flex, Typography, Button } from '@/design-system'
import { useCallback } from 'react'

export function IndexInfoToggle() {
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
    <Flex className="gap-x-4 items-center h-[14px]">
      <Button
        variant="link"
        onClick={() => {
          router.replace(`${pathname}`)
        }}
        className={
          searchParams.get('view') === 'info'
            ? 'decoration-secondary-foreground'
            : 'hover:no-underline'
        }
      >
        <Typography
          className={
            searchParams.get('view') === 'info'
              ? 'text-secondary-foreground'
              : 'text-primary-foreground'
          }
        >
          Index
        </Typography>
      </Button>
      <Button
        variant="link"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('view', 'info')}`)
        }}
        className={
          searchParams.get('view') === 'info'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
      >
        <Typography
          className={
            searchParams.get('view') === 'info'
              ? 'text-primary-foreground'
              : 'text-secondary-foreground'
          }
        >
          Info
        </Typography>
      </Button>
    </Flex>
  )
}
