'use client'

import { Channel } from '@/gql'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { ItemsListMobile, ItemsListWeb } from '.'

export function ItemsWrapper({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  const { isMobile } = useMediaQuery()

  if (isMobile) return <ItemsListMobile channel={channel} metadata={metadata} />
  return <ItemsListWeb channel={channel} metadata={metadata} />
}
