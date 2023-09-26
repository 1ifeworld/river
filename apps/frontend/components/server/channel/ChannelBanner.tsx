import {
  Flex,
  cn,
  Stack,
  Body,
  Card,
  Headline,
  BodyLarge,
} from '@river/estuary'
import Image from 'next/image'
import { ChannelModal } from '@/client'
import { Hex } from 'viem'
import { Channel } from '@/gql'
import { ipfsToHttps, truncateText, getAddressDisplay } from '@/utils'

export async function ChannelBanner({ channels }: { channels: Channel }) {
  // Attempt to resolve relevant address/ens before component renders
  const creatorEnsOrAddress = channels?.createdBy
    ? await getAddressDisplay(channels.createdBy as Hex)
    : ''

  return (
    <Flex className="flex-wrap md:flex-nowrap md:gap-8">
      <Card size="lg" className="relative shadow-reg w-full md:w-fit">
        <Image
          className="object-cover aspect-square"
          src={ipfsToHttps(channels?.contractUri?.image as string)}
          alt={
            channels?.contractUri?.name
              ? channels?.contractUri?.name
              : 'Channel name missing'
          }
          fill
        />
      </Card>
      {/* Channel settings */}
      {/* Second Column: Text details */}
      <Stack className="h-full justify-top md:justify-end cursor-default h-[248px]">
        <span className="inline-block mb-5">
          <Headline className="font-medium text-label">
            {truncateText(channels?.contractUri?.name ?? '', 20)
              ? channels?.contractUri?.name
              : 'Channel name missing'}
          </Headline>
          <Headline className="text-label-muted font-normal">
            {creatorEnsOrAddress}
            {(channels?.logicTransmitterMerkleAdmin[0].accounts
              ?.length as number) > 1
              ? ` + ${
                  (channels?.logicTransmitterMerkleAdmin[0].accounts
                    ?.length as number) - 1
                } others`
              : ''}
          </Headline>
        </span>
        <Body className="text-label-muted mb-[44px]">
          {channels?.contractUri?.description
            ? channels?.contractUri?.description
            : ''}
        </Body>
        <span>
          <ChannelModal />
        </span>
      </Stack>
    </Flex>
  )
}
