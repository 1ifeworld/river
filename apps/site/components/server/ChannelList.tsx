import { Flex, Typography } from '@/design-system'
import Image from 'next/image'

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
    <Flex className="justify-start items-center w-full border-b py-2 text-[#414141]">
        <img
          alt={"placholder"} 
          src={"/placeholder_card.png"}
          width={"38px"}
          height={"38px"}
        />
        <Typography variant="smallText" className='w-[57%] ml-[12px]'>{name}</Typography>
        <Typography variant="smallText" className="w-[20%] ml-[12px]">{creator}</Typography>
        <Typography variant="smallText" className="w-[20%] ml-[12px]">{modified}</Typography>
    </Flex>
  )
}
