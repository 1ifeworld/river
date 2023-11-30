import { Stack, Typography, Flex } from '@/design-system'
import { type Channel } from '@/gql'
import { getUsername } from '@/lib'
import { pluralize } from '@/utils'
import Link from 'next/link'

export async function ChannelCard({ channel }: { channel: Channel }) {
  const username = await getUsername({ id: channel.creatorId })

  // const { name, description, image  } = await getChannelUriContents({
  //   uri: channel.uri
  // })

  const mockUriContentsObject: {
    name: string,
    description: string,
    image: string
  } = {
    name: "YesandNo",
    description: "Imeannnnnnn",
    image: "ipfs://bafkreiamfxbkndyuwkw4kutjcfcitozbtzrvqneryab2njltiopsfjwt6a"
  }

  return (
    <Link href={`/channel/${channel.id}`}>
      <Stack className="border px-3 py-5 justify-between aspect-square hover:bg-primary/[0.025] transition-all">
        {/* Channel Name */}
        <Typography>{mockUriContentsObject.name}</Typography>
        <Flex>
          {/* Channel Owner */}
          <Typography className="text-secondary-foreground">
            {username?.username ?? ''}
          </Typography>
          <span className="text-secondary-foreground">{'·'}</span>
          {/* Number of Items */}
          <Typography className="text-secondary-foreground">
            {pluralize(channel.items.length, 'item', 'items')}
          </Typography>
        </Flex>
      </Stack>
    </Link>
  )
}
