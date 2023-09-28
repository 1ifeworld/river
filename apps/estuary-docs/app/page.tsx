import { BodyLarge, Stack } from "@river/estuary"

export default function Home() {
  return (
    <Stack className='gap-3 max-w-prose'>
      <BodyLarge>Estuary is an opinionated design system built for River.</BodyLarge>
      <BodyLarge>It is organized into three core areas: <span className="font-bold">Tokens</span>, <span className="font-bold">Elements</span>, and <span className="font-bold">Components</span>.</BodyLarge>
      <BodyLarge>For more detailed information, navigate to an individual piece to view example implementations and instructions for use.</BodyLarge>
    </Stack>
  )
}
