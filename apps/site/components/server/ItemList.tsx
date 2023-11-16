import { Stack, Flex, Typography } from '@/design-system'

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
    <Flex className="justify-start items-center w-full border-b py-2">
        {/* Item Image */}
        <img
          alt={"placholder"} 
          src={"/placeholder_card.png"}
          width={"38px"}
          height={"38px"}
        />      
        <Stack className='w-[57%] ml-[12px] space-y-[4px]'>
          <Typography variant="smallText" className='text-[#414141]'>{name}</Typography>
          <Typography variant="smallText" className='text-[#747474]'>{creator}</Typography>
        </Stack>
        <Typography variant="smallText" className="w-[20%] ml-[12px] text-[#414141]">{channel}</Typography>
        <Typography variant="smallText" className="w-[20%] ml-[12px] text-[#414141]">{added}</Typography>
    </Flex>
  )
}
