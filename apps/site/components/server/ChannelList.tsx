import { Flex, Typography } from '@/design-system'

export async function ChannelList({ 
    name, 
    creator, 
    imageUri, 
    modified 
}: { 
    name: string,
    creator: string,
    imageUri: string,
    modified: string
}) {

  return (        
    <Flex className="justify-start ">
        {/* Channel Name */}
        <Typography variant="smallText">{name}</Typography>
        {/* Channel Creator */}
        <Typography variant="smallText">{creator}</Typography>
        {/* Channel Modified */}
        <Typography variant="smallText">{modified}</Typography>
    </Flex>
  )
}
