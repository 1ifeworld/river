'use client'

import { Channel } from '@/gql'
import { useMediaQuery } from '@/hooks'
import { BannerWeb, BannerMobile } from '.'

export function BannerWrapper({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  const { isMobile } = useMediaQuery()

  if (isMobile) return <BannerMobile channel={channel} metadata={metadata} />
  return <BannerWeb channel={channel} metadata={metadata} />
}
