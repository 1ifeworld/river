import React from 'react'
import { Flex, Body, IconContainer } from '@river/estuary'
import { getChannel } from '@/gql'
import { getAddress } from 'viem'
import { extractAddressFromListingId } from '@/utils'
import Link from 'next/link'

export async function ListingNav({ listing }: { listing: any }) {
  const { channels } = await getChannel({
    channel: getAddress(extractAddressFromListingId(listing.id)) as string,
  })

  return (
    <Flex className="pl-4 items-center h-[50px] border-b gap-x-[8px] border-base-shade">
      <Link
        href={`/channel/${
          getAddress(extractAddressFromListingId(listing.id)) as string
        }`}
      >
        <Body className="text-label-muted hover:underline decoration-label-muted underline-offset-[3px]">
          {channels?.[0].contractUri?.name}
        </Body>
      </Link>

      <IconContainer className="stroke-base-border" icon="ChevronRight" />
      <Body className="text-label">
        {listing.listingTargetMetadata.pieceName}
      </Body>
    </Flex>
  )
}
