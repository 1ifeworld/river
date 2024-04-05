import { Typography, Flex, Button } from '@/design-system'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import Link from 'next/link'

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
    <Flex className="gap-x-3">
      <Button
        variant="link"
        onClick={() => {
          router.back()
        }}
        className="hover:underline underline-offset-2 transition-all"
        disabled={!pageInfo?.hasPreviousPage}
      >
        <Typography>Prev</Typography>
      </Button>
      {/* <Button
        variant="link"
        onClick={() => {
          router.push(
            `/?${createQueryString('after', pageInfo?.endCursor as string)}`,
          )
        }}
        className="hover:underline underline-offset-2 transition-all"
        disabled={!pageInfo?.hasNextPage}
      >
        <Typography>Next</Typography>
      </Button> */}
      <Link
        className="hover:underline underline-offset-2 transition-all"
        href={`/?${createQueryString('after', pageInfo?.endCursor as string)}`}
      >
        <Typography>Next</Typography>
      </Link>
    </Flex>
  )
}
