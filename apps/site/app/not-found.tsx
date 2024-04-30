import Link from 'next/link'
import { Typography, Stack } from '@/design-system'
 
export default function NotFound() {
  return (

    <Stack className="gap-4 justify-center items-center h-[calc(100dvh-72px)]">
        <Typography variant="h1">Not Found</Typography>
        <Link href="/"><Typography>Return Home</Typography></Link>
    </Stack>
  )
}