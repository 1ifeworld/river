import Image from "next/image";
import { Stack, Typography, Card, Flex } from "@/design-system";
import { Channel } from "@/gql";
import { Add } from "@/client";
import { ipfsToHttps } from "@/lib";

export async function ChannelBanner({
  channel,
}: {
  /* biome-ignore lint: */
  //   channel: Channel;
  channel: any;
}) {
  // This is a placeholder component to represent a cover image
  const WhiteBox = () => {
    return (
      <div className="border-muted-foreground border-[.2px] bg-white w-[218px] h-[218px]" />
    );
  };

  return (
    <Flex className="items-end w-full h-full border-2 border-red-500 gap-x-[22px]">
      {/* column 1 */}
      <WhiteBox />

      {/* <Card size="lg" className="relative shadow-reg w-full md:w-fit">
        <Image
          className="object-cover aspect-square"
          src={ipfsToHttps(channel.coverImageUri as string)}
          alt={channel.name}
          fill
        />
      </Card> */}
      {/* column 2 */}
      <Stack className="w-full gap-y-[20px]">
        <Stack>
            <Typography variant="h2" className="text-black">{"Name" /* channel.name */}</Typography>
            <Typography variant="h2" className="text-secondary-foreground">{"junghwan.eth + 4 others" /* channel.admins */}</Typography>
        </Stack>
        <Typography className="text-primary-foreground">
          {"Description " /* channel.desc */}
        </Typography>
        <Add />
      </Stack>
    </Flex>
  );
}
