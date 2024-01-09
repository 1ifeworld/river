import { Flex, Stack, Typography, cn } from '@/design-system'
import { Channel, Reference } from '@/gql'
import { Username } from '@/server'
import { truncateText } from '@/utils'
import Link from 'next/link'

interface ChannelIndexProps {
  reference: Reference
  channel: Channel
  referenceMetadata: any
  channelMetadata: any
  channelRefsMetadata: any
  showTop: boolean
  className?: string
}

export function ChannelIndex({
  reference,
  channel,
  referenceMetadata,
  channelMetadata,
  channelRefsMetadata,
  className,
  showTop,
}: ChannelIndexProps) {
  return (
    <Stack className={`${cn(className)} h-full gap-y-8`}>
      {/* pinned to top */}
      {showTop ? (
        <Stack>
          <Typography className="text-black leading-0">
            {referenceMetadata?.name
              ? truncateText(referenceMetadata.name, 25)
              : 'untitled'}
          </Typography>
          <Flex className="items-center">
            <Username id={reference.pubRef?.createdBy} />
            <span className="text-secondary-foreground">{'·'}</span>
            <Link className="hover:underline" href={`/channel/${channel.id}`}>
              <Typography className="text-secondary-foreground leading-0">
                {truncateText(channelMetadata.name, 20)}
              </Typography>
            </Link>
          </Flex>
        </Stack>
      ) : (
        <></>
      )}
      {/* scrollable under index */}
      <Stack className="overflow-hidden gap-y-3">
        <Typography className="text-black leading-0">Index</Typography>
        <Stack className="h-full gap-y-3 overflow-scroll">
          {channel.references.map((reference: Reference, index: number) => (
            <ItemListView
              key={index}
              reference={reference}
              metadata={channelRefsMetadata}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export function ItemListView({
  reference,
  metadata,
}: {
  reference: Reference
  metadata: any
}) {
  const referenceMetadata = metadata.data[reference.pubRef?.uri as string]
  return (
    <Link
      className="flex flex-col hover:bg-divider hover:cursor-pointer"
      href={`/item/${reference.id}`}
    >
      <Typography className="leading-0">
        {referenceMetadata?.name
          ? truncateText(referenceMetadata.name, 25)
          : 'untitled'}
      </Typography>
      <Username id={reference.pubRef?.createdBy} />
    </Link>
  )
}
