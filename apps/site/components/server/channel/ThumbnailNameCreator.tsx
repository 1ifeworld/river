import Image from 'next/image'
import { fetchIpfsData } from '@/utils'
import { Item } from '@/gql'
import { Stack, Typography } from '@/design-system'
import { Username } from '../Username'
import { ipfsToHttps } from 'lib/ipfsToHttps'

export async function ThumbnailNameCreator({ item }: { item: Item }) {

    const hardcodedItemUri = "ipfs://bafkreidigo5zwthrfpvcsvogvb6oga5idbsupzan2pwphp7eb63cgwxjnq"
    const itemIpfsResponse = await fetchIpfsData(hardcodedItemUri)

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