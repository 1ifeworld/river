import { AddMembersForm, ItemDropzone } from "@/client";
import {
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Stack,
  Typography,
} from "@/design-system";
import { type Channel } from "@/gql";
import { Username } from "@/server";
import { pluralize, selectPluralForm, truncateText } from "@/utils";

export async function ChannelBanner({
  channel,
  metadata,
}: {
  channel: Channel;
  metadata?: any;
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

  return (
    // Include left margin to accommodate for margin necessary for hover states for items
    <Stack className="gap-5 md:ml-2">
      <Stack>

        <Typography className="">{channel.name}</Typography>
        {channel?.roles?.items?.[0].rid ? (

          <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
              <Flex>
                <Username id={channel?.roles?.items?.[0].rid} />
                {/* {channel?.members?.length > 0 && (
                  <Typography className="text-secondary-foreground ">
                    {`${'\u00A0'}+ ${pluralize(
                      channel?.members?.length,
                      'other',
                      'others',
                    )}`}
                  </Typography>
                )} */}
              </Flex>
            </HoverCardTrigger>
            {/* <HoverCardContent className="w-full border-2" align="start">
              <Stack className="gap-3">
                <span>
                  <Typography>
                    {selectPluralForm(
                      channel?.admins?.length,
                      'Admin',
                      'Admins',
                    )}
                  </Typography>
                  <Username id={channel?.admins?.[0]} />
                </span>
                {channel?.members?.length > 0 && (
                  <span>
                    <Typography>
                      {selectPluralForm(
                        channel?.members?.length,
                        'Member',
                        'Members',
                      )}
                    </Typography>
                    <Flex className="items-center">
                      {channel.members.map((member, index) => (
                        <>
                          <Username id={member} key={index} />
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
            </HoverCardContent> */}
          </HoverCard>
        ) : (
          <Typography className="text-secondary-foreground">
            'No admins configured for this channel'
          </Typography>
        )}
      </Stack>
      {/* This component is hidden on small screens */}
      <Typography className="hidden md:block max-w-[848px] line-clamp-3">
        {channel.description || "--"}
      </Typography>
      {/* This component is hidden on large screens */}
      <Typography className="md:hidden">
        {truncateText(channel.description, 90) || "--"}
      </Typography>
      <ItemDropzone channel={channel} />
    </Stack>
  );
}
