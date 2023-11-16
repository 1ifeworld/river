import { Stack, Flex, Typography } from '@/design-system'
import { ItemList } from '../ItemList'

export async function ActivityItems({ 
    user 
}: { 
    // user: User 
    user:  any
}) {

  return (
    <Stack className="">  
      <Flex>Items</Flex>

      <Flex className="mb-[10px] justify-start items-center w-full text-[#747474] text-[11.5px] ">
        <div className="w-[38px]"></div> {/* empty space over thumbnail */}
        <div className="w-[57%] ml-[12px]"></div> {/* empty space over name */}
        <div className="w-[20%] ml-[12px]">Added to</div>
        <div className="w-[20%] ml-[12px]">Date added</div>
      </Flex>

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
