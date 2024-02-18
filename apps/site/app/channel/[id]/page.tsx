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
      <div className="hidden md:block fixed top-[38px] z-50 w-full">
        <MarqueeWrapper />
      </div>
      <Flex className="px-5 pt-[70px] md:pt-[110px]">
        <div className="hidden md:w-[19%] md:block">
          <RecentChannels params={params} />
        </div>
        <div className="w-full md:w-[78%]">
          <Stack>
            <Stack className="gap-y-[45px]">
              <Flex className="justify-between">
                {/* @ts-ignore */}
                <ChannelBanner channel={channel} />
                <ViewToggle />
              </Flex>
              <ChannelItems
                // @ts-ignore
                channel={channel}
                metadata={metadata}
                view={searchParams.view}
              />
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
