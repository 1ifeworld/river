import { AddMembersForm, UploadDialog } from '@/client'
import {
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Stack,
  Typography,
} from '@/design-system'
import { type Channel } from '@/gql'
import { Username } from '@/server'
import { pluralize, selectPluralForm, truncateText } from '@/utils'

export async function ChannelBanner({
  channel,
  metadata,
}: { channel: Channel; metadata: any }) {
  const channelMetadata = metadata.data[channel.uri as string]

  if (!channelMetadata) {
    return (
      <Stack className="pt-16 gap-14">
        <Typography>This is not a valid channel</Typography>/
      </Stack>
    )
  }

  return (
    // Include left margin to accommodate for margin necessary for hover states for items
    <Stack className="gap-5 md:ml-2">
      <Stack>
        <Typography className="leading-0">{channelMetadata.name}</Typography>
        {channel?.admins?.[0] ? (
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
              <Flex>
                <Username
                  className="text-primary-foreground"
                  id={channel?.admins?.[0]}
                />
                {channel?.members?.length > 0 && (
                  <Typography>
                    {`${'\u00A0'}+ ${pluralize(
                      channel?.members?.length,
                      'other',
                      'others',
                    )}`}
                  </Typography>
                )}
              </Flex>
            </HoverCardTrigger>
            <HoverCardContent className="w-full border-2" align="start">
              <Stack className="gap-3">
                <span>
                  <Typography className="leading-0">
                    {selectPluralForm(
                      channel?.admins?.length,
                      'Admin',
                      'Admins',
                    )}
                  </Typography>
                  <Username className="leading-0" id={channel?.admins?.[0]} />
                </span>
                {channel?.members?.length > 0 && (
                  <span>
                    <Typography className="leading-0">
                      {selectPluralForm(
                        channel?.members?.length,
                        'Member',
                        'Members',
                      )}
                    </Typography>
                    <Flex className="items-center">
                      {channel.members.map((member, index) => (
                        <>
                          <Username
                            className="leading-0"
                            id={member}
                            key={index}
                          />
                          {index < channel.members.length - 1 && (
                            <Typography className="text-secondary-foreground">
                              {'·'}
                            </Typography>
                          )}
                        </>
                      ))}
                    </Flex>
                  </span>
                )}
                <AddMembersForm targetChannelId={channel.id} />
              </Stack>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Typography className="text-secondary-foreground">
            'No admins configured for this channel'
          </Typography>
        )}
      </Stack>
      {/* This component is hidden on small screens */}
      <Typography className="hidden md:block text-secondary-foreground">
        {channelMetadata.description}
      </Typography>
      {/* This component is hidden on large screens */}
      <Typography className="md:hidden text-secondary-foreground leading-none">
        {truncateText(channelMetadata.description, 90)}
      </Typography>
      <UploadDialog />
    </Stack>
  )
}
