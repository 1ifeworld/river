import { Stack, Flex, Typography } from '@/design-system'
import { ItemList } from '../ItemList'

export async function UserItems({ 
    user 
}: { 
    // user: User 
    user:  any
}) {

  return (
    <Stack className="">  
    <Flex>Items</Flex>
      {user.items.map((item: any) => (
        <ItemList 
            key={item.id} 
            name={item.name} 
            creator={item.creator} 
            imageUri={item.imageUri} 
            channel={item.channel} 
            added={item.added} 
        />
      ))}
    </Stack>
  )
}
