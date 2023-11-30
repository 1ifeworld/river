import Image from "next/image";
import { Stack, Typography, Card, Flex } from "@/design-system";
import { Channel } from "@/gql";
import { Add } from "@/client";
import { ipfsToHttps } from "@/lib";
import { fetchIpfsData } from "utils/fetchIpfsData";

export async function ChannelBanner({ channel }: { channel: Channel }) {
  
  const channelUriIpfsResponse = await fetchIpfsData(channel.uri as string);

  if (!channelUriIpfsResponse) {
    return (
      <Flex className="items-end w-full h-full gap-x-[22px]">
        {/* column 1 */}
        <Card className="relative w-[218px] h-[218px] outline-none border-none">
          <Image
            className="object-cover aspect-square"
            src={""}
            alt={"invalid image"}
            fill
          />
        </Card>
        {/* column 2 */}
        <Stack className="w-full gap-y-[20px]">
          <Stack>
            <Typography variant="h2" className="text-black">
              {"invalid channel"}
            </Typography>
            <Typography variant="h2" className="text-secondary-foreground">
              {""}
            </Typography>
          </Stack>
          <Typography className="text-primary-foreground">
            {"mockUriContentsObject.description"}
          </Typography>
          <Add />
        </Stack>
      </Flex>
    );
  }

  return (
    <Flex className="items-end w-full h-full gap-x-[22px]">
      {/* column 1 */}
      <Card className="relative w-[218px] h-[218px] outline-none border-none">
        <Image
          className="object-cover aspect-square"
          src={ipfsToHttps(channelUriIpfsResponse.image)}
          alt={channelUriIpfsResponse.name}
          fill
        />
      </Card>
      {/* column 2 */}
      <Stack className="w-full gap-y-[20px]">
        <Stack>
          <Typography variant="h2" className="text-black">
            {channelUriIpfsResponse.name}
          </Typography>
          <Typography variant="h2" className="text-secondary-foreground">
            {channel.admins}
          </Typography>
        </Stack>
        <Typography className="text-primary-foreground">
          {channelUriIpfsResponse.description}
        </Typography>
        <Add />
      </Stack>
    </Flex>
  );
}
