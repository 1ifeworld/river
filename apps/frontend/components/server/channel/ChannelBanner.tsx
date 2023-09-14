import {
  Flex,
  cn,
  Stack,
  Body,
  Card,
  Headline,
  BodyLarge,
} from '@river/design-system'
import Image from 'next/image'
import { ChannelModal } from '../../client/AddToChannelModal'
import { Hex } from 'viem'
import { Channel } from '../../../gql/sdk.generated'
import { ipfsToHttps, shortenAddress, getAddressDisplay } from '../../../utils'
import { truncateText } from '../../../utils'

export async function ChannelBanner({ channels }: { channels: Channel }) {
  // Attempt to resolve relevant address/ens before component renders
  const creatorEnsOrAddress = channels?.createdBy
    ? await getAddressDisplay(channels.createdBy as Hex)
    : ''

  return (
    <Flex className="gap-x-8 h-[248px]">
      <Card size="lg" className="relative">
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
      <Stack className="h-full justify-end cursor-default">
        <span className="inline-block mb-5">
          <Headline className="font-medium text-label">
            {truncateText(channels?.contractUri?.name ?? '', 20)
              ? channels?.contractUri?.name
              : 'Channel name missing'}
          </Headline>
          <BodyLarge className="text-label-muted">
            {creatorEnsOrAddress}
            {(channels?.logicTransmitterMerkleAdmin[0].accounts
              ?.length as number) > 1
              ? ` + ${
                  (channels?.logicTransmitterMerkleAdmin[0].accounts
                    ?.length as number) - 1
                } others`
              : ''}
          </BodyLarge>
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
