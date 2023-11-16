import { Flex, Typography } from '@/design-system'

export async function ItemList({ 
    name, 
    creator, 
    imageUri, 
    channel,
    added 
}: { 
    name: string,
    creator: string,
    imageUri: string,
    channel: string,
    added: string
}) {

  return (        
    <Flex className="justify-start ">
        {/* Item Name */}
        <Typography variant="smallText">{name}</Typography>
        {/* Item Creator */}
        <Typography variant="smallText">{creator}</Typography>
        {/* Item Channel */}
        <Typography variant="smallText">{channel}</Typography>        
        {/* Item added */}
        <Typography variant="smallText">{added}</Typography>
    </Flex>
  )
}
