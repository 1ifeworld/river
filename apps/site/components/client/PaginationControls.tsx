import { Typography, Flex, Button } from '@/design-system'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface PaginationControlsProps {
  startCursor?: string
  endCursor?: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export function PaginationControls({
  pageInfo,
}: { pageInfo?: PaginationControlsProps }) {
  const router = useRouter()

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams()
    params.set(name, value)

    return params.toString()
  }, [])

  return (
    <Flex className="gap-x-3">
      <Button
        variant="link"
        onClick={() => {
          router.replace(
            `/?${createQueryString('before', pageInfo?.startCursor as string)}`,
          )
        }}
        className="hover:underline underline-offset-2 transition-all"
        disabled={!pageInfo?.hasPreviousPage}
      >
        <Typography>Prev</Typography>
      </Button>

      <Button
        variant="link"
        onClick={() => {
          router.replace(
            `/?${createQueryString('after', pageInfo?.endCursor as string)}`,
          )
        }}
        className="hover:underline underline-offset-2 transition-all"
        disabled={!pageInfo?.hasNextPage}
      >
        <Typography>Next</Typography>
      </Button>
    </Flex>
  )
}
