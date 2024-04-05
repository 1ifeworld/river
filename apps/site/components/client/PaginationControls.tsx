import { Typography, Flex } from '@/design-system'
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
      <Link
        className="hover:underline underline-offset-2 transition-all"
        href={`/?${createQueryString('before', pageInfo?.startCursor as string)}`}
      >
        <Typography>Prev</Typography>
      </Link>
      <Link
        className="hover:underline underline-offset-2 transition-all"
        href={`/?${createQueryString('after', pageInfo?.endCursor as string)}`}
      >
        <Typography>Next</Typography>
      </Link>
    </Flex>
  )
}
