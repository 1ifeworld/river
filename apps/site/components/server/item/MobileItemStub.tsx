import { Stack, Typography, cn } from '@/design-system'
import { Reference } from '@/gql'
import { Username } from '@/server'
import { truncateText, unixTimeConverter } from '@/utils'

interface MobileItemStubProps {
  reference: Reference
  referenceMetadata: any
  className?: string
}

export function MobileItemStub({
  reference,
  referenceMetadata,
  className,
}: MobileItemStubProps) {
  return (
    <Stack className={cn(className)}>
      <Stack className="">
        <Typography className="text-black leading-0">
          {truncateText(referenceMetadata.name, 50)}
        </Typography>
        <Username id={reference.pubRef?.createdBy} />
      </Stack>
      <Typography className="pt-4 text-secondary-foreground leading-0">
        {unixTimeConverter(reference.pubRef?.createdTimestamp)}
      </Typography>
    </Stack>
  )
}
