import { Stack, Flex, Typography } from "@/design-system";
import { ChannelList } from "../ChannelList";

export async function ActivityChannels({
  user,
}: {
  // user: User
  user: any;
}) {
  return (
    <Stack className="">  
      <Flex>Channels</Flex>

      {/* Column Headers */}
      <Flex className="mb-[10px] justify-start items-center w-full text-[#747474] text-[11.5px] ">
        <div className="w-[38px]"></div> {/* empty space over thumbnail */}
        <div className="w-[57%] ml-[12px]"></div> {/* empty space over name */}
        <div className="w-[20%] ml-[12px]">Creator</div>
        <div className="w-[20%] ml-[12px]">Date modified</div>
      </Flex>

      {user.channels.map((channel: any) => (
        <ChannelList 
            key={channel.id} 
            name={channel.name} 
            creator={channel.creator} 
            imageUri={channel.imageUri} 
            modified={channel.modified} 
        />
      ))}
    </Stack>
  );
}
