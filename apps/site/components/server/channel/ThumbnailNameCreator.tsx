import Image from 'next/image'
import { fetchIpfsData } from '@/utils'
import { Item } from '@/gql'
import { Stack, Typography } from '@/design-system'
import { Username } from '../Username'
import { ipfsToHttps } from 'lib/ipfsToHttps'

export async function ThumbnailNameCreator({ item }: { item: Item }) {

    let itemIpfsResponse;
    if (item.target?.publication?.uri) {
        itemIpfsResponse = await fetchIpfsData(item.target?.publication?.uri)
    }

    if (!itemIpfsResponse) {
        return (
            <>
            <Image
            className="object-cover aspect-square "
            src={""}
            alt={""}                
            width={40}
            height={40}
            />
            <Stack className="">
                <Typography className="text-primary-foreground">
                {""}
                </Typography>
            </Stack>
        </>
        )
    }

    return (
        <>
            <Image
            className="object-cover aspect-square "
            src={ipfsToHttps(itemIpfsResponse.image)}
            alt={itemIpfsResponse.name}                
            width={40}
            height={40}
            />
            <Stack className="">
                <Typography className="text-primary-foreground">
                {itemIpfsResponse.name}
                </Typography>
                <Username id={item.creatorId} />
            </Stack>
        </>
    )
}