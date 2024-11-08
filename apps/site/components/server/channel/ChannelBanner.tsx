import { ChannelMembersPopover, ChannelSettings, ItemDropzone } from '@/client'
import { Flex, Stack, Typography, Public } from '@/design-system'
import type { Adds, Channel, ChannelRoles } from '@/gql'
import { Username } from '@/server'
import { truncateText } from '@/utils'
import { USER_ID_ZERO } from '@/constants'

export async function ChannelBanner({
  channel,
  metadata,
}: {
  channel: Channel
  // biome-ignore lint:
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
    (item) => item.rid !== USER_ID_ZERO && Number.parseInt(item.role) === 1,
  ).length as number

  function checkIsPublic({ roleData }: { roleData: ChannelRoles[] }) {
    for (let i = 0; i < roleData.length; ++i) {
      if (roleData[i].rid === USER_ID_ZERO && roleData[i].role > 0) return true
    }
    return false
  }

  const isPublic = !channel?.roles?.items
    ? false
    : checkIsPublic({ roleData: channel?.roles?.items })

  return (
    // Include left margin to accommodate for margin necessary for hover states for items
    <Stack className="gap-5 md:ml-2">
      <Stack className="gap-y-[3px]">
        <Flex className="items-center gap-x-[4px]">
          <Typography>{channel.name}</Typography>
          {isPublic && <Public />}
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
      <div className="pt-[10px]">
        <ItemDropzone channel={channel} />
      </div>
    </Stack>
  )
}
