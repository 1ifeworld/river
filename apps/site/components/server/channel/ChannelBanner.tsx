import { ChannelMembersPopover, ItemDropzone, ChannelSettings } from '@/client'
import { Flex, Stack, Typography } from '@/design-system'
import { type Channel, type Adds } from '@/gql'
import { Username } from '@/server'
import { truncateText } from '@/utils'

export async function ChannelBanner({
  channel,
  metadata,
}: {
  channel: Channel
  metadata?: any
}) {
  // const channelMetadata = metadata.data[channel.uri as string]

  // if (!channelMetadata) {
  //   return (
  //     <Stack className="pt-16 gap-14">
  //       <Typography>This is not a valid channel</Typography>/
  //     </Stack>
  //   )
  // }

  // channel.roles?.items[0].role == 2
  // channel.roles?.items[0].role == 1

  const lastFourNonRemovedItems: Adds[] = (channel?.adds?.items ?? [])
    .filter((item) => !item.removed)
    .slice(0, 4)

  const activeMemberCount = channel?.roles?.items?.filter(
    (item) => parseInt(item.role) === 1,
  ).length as number

  return (
    // Include left margin to accommodate for margin necessary for hover states for items
    <Stack className="gap-5 md:ml-2">
      <Stack>
        <Flex className="items-center gap-x-[4px]">
          <Typography>{channel.name}</Typography>
          <ChannelSettings channel={channel} />
        </Flex>
        {channel?.roles?.items?.[0]?.rid ? (
          activeMemberCount > 0 ? (
            <ChannelMembersPopover
              popoverTrigger={
                <Username id={channel.roles.items[0].rid} asLink={false} />
              }
              popoverContent={channel.roles.items.map((role, index) => (
                <Username key={index} id={role.rid} />
              ))}
              activeMemberCount={activeMemberCount}
            />
          ) : (
            <Username id={channel.roles.items[0].rid} />
          )
        ) : (
          <Typography className="text-secondary-foreground">
            No admins configured for this channel
          </Typography>
        )}
      </Stack>
      {/* This component is hidden on small screens */}
      <Typography className="hidden md:block max-w-[848px] line-clamp-3">
        {channel.description || '--'}
      </Typography>
      {/* This component is hidden on large screens */}
      <Typography className="md:hidden">
        {truncateText(channel.description, 90, true) || '--'}
      </Typography>
      <ItemDropzone channel={channel} />
    </Stack>
  )
}
