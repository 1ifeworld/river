import {
  Flex,
  cn,
  Stack,
  Body,
  Card,
  Headline,
  BodyLarge,
} from '@river/design-system'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="my-[80px]">
      <Flex className="gap-x-8 h-[248px]">
        <Card size="lg" className="bg-base-border animate-pulse"></Card>
        {/* Second Column: Text details */}
        <Stack className="h-full justify-end cursor-default">
          <span className="inline-block mb-5">
            <Headline className="font-medium text-label">{}</Headline>
            <BodyLarge className="text-label-muted">{}</BodyLarge>
          </span>
          <Body className="text-label-muted mb-[44px]">{}</Body>
        </Stack>
      </Flex>
    </div>
  )
}
