import Link from 'next/link'
import { Body, Stack } from '@river/estuary'
import { FourOhFour } from '@/server'

export default function NotFound() {
  return (
    <Stack className="h-screen justify-center items-center gap-4 md:gap-8">
      <div className="transform scale-[.65] md:scale-100">
        <FourOhFour />
      </div>
      <Body className="text-label">
        page not found,{' '}
        <Link className="underline hover:text-label-muted" href="/">
          go back
        </Link>
      </Body>
    </Stack>
  )
}
