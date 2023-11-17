import Image from "next/image";
import { Stack, Typography, Card, Flex } from "@/design-system";
import { ChannelWithHashQuery } from "@/gql";
import { Add } from "@/client";
import { ipfsToHttps } from "@/lib";

export async function ChannelBanner({ channel }: { channel: ChannelWithHashQuery }) {

  return (
    <Flex className="items-end w-full h-full border-2 border-red-500 gap-x-[22px]">
      {/* column 1 */}
      <Card className="relative w-[218px] h-[218px] outline-none border-none">
        <Image
          className="object-cover aspect-square"
          src={ipfsToHttps(channel.channels[0].coverImageURI as string)}
          alt={channel.channels[0].name as string}
          fill
        />
      </Card>
      {/* column 2 */}
      <Stack className="w-full gap-y-[20px]">
        <Stack>
            <Typography variant="h2" className="text-black">{"Name"/* channel.name */}</Typography>
            <Typography variant="h2" className="text-secondary-foreground">{"junghwan.eth + 4 others" /* channel.admins */}</Typography>
        </Stack>
        <Typography className="text-primary-foreground">
          {"Description"/* channel.channels[0].description */}
        </Typography>
        <Add />
      </Stack>
    </Flex>
  );
}
