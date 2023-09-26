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
    <Flex className="flex-wrap md:flex-nowrap gap-2 md:gap-8">
      {/* First Column: Channel cover image*/}
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
      {/* Second Column: Channel settings */}
      <span>
        <Stack className="h-full justify-end gap-12">
          <span>
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
            <Body className="text-label-muted">
              {channels?.contractUri?.description
                ? channels?.contractUri?.description
                : ''}
            </Body>
          </span>
          <ChannelModal />
        </Stack>
      </span>
    </Flex>
  )
}
