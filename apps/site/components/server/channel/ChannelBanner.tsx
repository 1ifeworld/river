import Image from 'next/image'
import { Stack, Typography, Card, Flex } from '@/design-system'
import { Channel } from '@/gql'
import { Add } from '@/client'
import { ipfsToHttps } from '@/lib'

export async function ChannelBanner({ channel }: { channel: Channel }) {

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
    <Flex className="items-end w-full h-full gap-x-[22px]">
      {/* column 1 */}
      <Card className="relative w-[218px] h-[218px] outline-none border-none">
        <Image
          className="object-cover aspect-square"
          src={ipfsToHttps(mockUriContentsObject.image)}
          alt={mockUriContentsObject.name}
          fill
        />
      </Card>
      {/* column 2 */}
      <Stack className="w-full gap-y-[20px]">
        <Stack>
          <Typography variant="h2" className="text-black">
            {mockUriContentsObject.name}
          </Typography>
          <Typography variant="h2" className="text-secondary-foreground">
            {channel.admins}
          </Typography>
        </Stack>
        <Typography className="text-primary-foreground">
          {mockUriContentsObject.description}
          {/* {channel.uri?.description
            ? channel.uri?.description
            : 'example description'} */}
        </Typography>
        <Add />
      </Stack>
    </Flex>
  )
}
