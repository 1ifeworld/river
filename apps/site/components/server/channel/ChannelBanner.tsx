import { AddMembersForm, UploadDialog } from '@/client'
import {
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Stack,
  Typography,
} from '@/design-system'
import { Channel } from '@/gql'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import { GenericThumbnailLarge, Username } from '@/server'
import { pluralize, selectPluralForm, truncateText } from '@/utils'
import Image from 'next/image'

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

  const cid = ipfsUrlToCid({ ipfsUrl: channelMetadata.image })

  return (
    <Stack className="sticky top-0 gap-4 md:gap-6 md:h-full md:w-[425px]">
      {/* The negative margin allows cover images to reach the edges of the screen */}
      <div className="relative -mx-5">
        <>
          {cid ? (
            <Image
              className="object-cover w-full h-[316px]"
              src={pinataUrlFromCid({ cid })}
              alt={channelMetadata.name}
              width={0}
              height={0}
              sizes="(min-width: 768px) 25vw, 100vw"
              priority={true}
            />
          ) : (
            <GenericThumbnailLarge text={'?'} />
          )}
        </>
      </div>
      <Stack className="gap-4 md:gap-5">
        <Stack>
          <Typography variant="h2" className="text-black">
            {channelMetadata.name}
          </Typography>
          {channel?.admins?.[0] ? (
            <HoverCard>
              <HoverCardTrigger className="cursor-pointer">
                <Flex>
                  <Username className="text-xl" id={channel?.admins?.[0]} />
                  {channel?.members?.length > 0 && (
                    <Typography
                      variant="h2"
                      className="text-secondary-foreground"
                    >
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

                  {/* <Stack className='border-2 border-red-500'>
                    hehehehehe
                  </Stack> */}

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
        <Typography className="hidden md:block text-primary-foreground">
          {channelMetadata.description}
        </Typography>
        {/* This component is hidden on large screens */}
        <Typography className="md:hidden text-primary-foreground leading-none">
          {truncateText(channelMetadata.description, 90)}
        </Typography>
        <UploadDialog />
      </Stack>
    </Stack>
  )
}
