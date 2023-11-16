import { Stack, Flex, Typography } from "@/design-system";
import { ChannelList } from "../ChannelList";

export async function UserChannels({
  user,
}: {
  // user: User
  user: any;
}) {
  return (
    <Stack className="">  
    <Flex>Channels</Flex>
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
