import { ViewToggle } from '@/client'
import { Flex, Stack, Typography } from '@/design-system'
import { getChannelWithId } from '@/gql'
import { getAddsMetadata } from '@/lib'
import {
  ChannelBanner,
  ChannelDetails,
  ChannelItems,
  MarqueeWrapper,
  RecentChannels,
} from '@/server'
import { Suspense } from 'react'

export default async function Channel({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { channel } = await getChannelWithId({
    id: params.id,
  })

  if (!channel) {
    return <Typography>This is not a valid channel</Typography>
  }

  // @ts-ignore
  const { metadata } = await getAddsMetadata(channel?.adds?.items)

  return (
    <section>
      <div className="fixed top-[var(--header-height)] z-50 w-full">
        <MarqueeWrapper />
      </div>
      <Flex className="px-5 pt-[104px]">
        <div className="hidden md:w-[19%] md:block">
          <RecentChannels params={params} />
        </div>
        <div className="w-full md:w-[78%]">
          <Stack>
            <Stack className="gap-y-5">
              <Flex className="justify-between">
                {/* @ts-ignore */}
                <ChannelBanner channel={channel} />
                <ViewToggle />
              </Flex>
              <Suspense fallback={<p>Loading channel items...</p>}>
                <ChannelItems
                  // @ts-ignore
                  channel={channel}
                  metadata={metadata}
                  view={searchParams.view}
                />
              </Suspense>
            </Stack>
            {/* @ts-ignore */}
            <ChannelDetails channel={channel} />
          </Stack>
        </div>
        <div className="hidden md:w-[3%] md:block">{}</div>
      </Flex>
    </section>
  )
}
