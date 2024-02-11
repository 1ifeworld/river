import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Flex, Typography, Button } from '@/design-system'
import { useCallback } from 'react'

export function InfoIndexToggle() {
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
    <Flex className="gap-x-4 items-center h-[14px] pb-[30px]">
      <Button
        variant="link"
        onClick={() => {
          router.replace(`${pathname}`)
        }}
        className={
          searchParams.get('view') === 'index'
            ? 'decoration-secondary-foreground'
            : 'hover:no-underline'
        }
      >
        <Typography
          className={
            searchParams.get('view') === 'index'
              ? 'text-secondary-foreground'
              : 'text-primary-foreground'
          }
        >
          Information
        </Typography>
      </Button>
      <Button
        variant="link"
        onClick={() => {
          router.push(`${pathname}?${createQueryString('view', 'index')}`)
        }}
        className={
          searchParams.get('view') === 'index'
            ? 'hover:no-underline'
            : 'decoration-secondary-foreground'
        }
      >
        <Typography
          className={
            searchParams.get('view') === 'index'
              ? 'text-primary-foreground'
              : 'text-secondary-foreground'
          }
        >
          Index
        </Typography>
      </Button>
    </Flex>
  )
}
