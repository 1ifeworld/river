import { Typography, Flex } from '@/design-system'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import Link from 'next/link'

export function PaginationControls() {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  // Get the current 'refs' value, parse it to an integer, increment it, and convert it back to a string
  const nextRefs = (
    Number.parseInt(searchParams.get('refs') || '0') + 1
  ).toString()

  // Get the current 'refs' value, parse it to an integer, decrement it (but not below 0), and convert it back to a string
  const prevRefs = Math.max(
    Number.parseInt(searchParams.get('refs') || '0') - 1,
    0,
  ).toString()

  return (
    <Flex className="gap-x-3">
      <Link
        className="hover:underline underline-offset-2 transition-all"
        href={`/?${createQueryString('refs', prevRefs)}`}
      >
        <Typography>Prev</Typography>
      </Link>
      <Link
        className="hover:underline underline-offset-2 transition-all"
        href={`/?${createQueryString('refs', nextRefs)}`}
      >
        <Typography>Next</Typography>
      </Link>
    </Flex>
  )
}
