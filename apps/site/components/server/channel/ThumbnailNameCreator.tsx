import Image from 'next/image'
import { Item } from '@/gql'
import { Stack, Typography } from '@/design-system'
import { Username } from '../Username'
import { ipfsToHttps } from 'lib/ipfsToHttps'

export async function ThumbnailNameCreator({ item, metadata }: { item: Item, metadata: any }) {
  
  const itemMetadata = metadata.data[item.target?.publication?.uri as string]
  
  if (!itemMetadata) {
    return (
      <>
        <Image
          className="object-cover aspect-square "
          src={''}
          alt={''}
          width={40}
          height={40}
        />
        <Stack className="">
          <Typography className="text-primary-foreground">{''}</Typography>
        </Stack>
      </>
    )
  }

  return (
    <>
      <Image
        className="object-cover aspect-square "
        src={ipfsToHttps(itemMetadata.image)}
        alt={itemMetadata.name}
        width={40}
        height={40}
      />
      <Stack className="">
        <Typography className="text-primary-foreground">
          {itemMetadata.name}
        </Typography>
        <Username id={item.creatorId} />
      </Stack>
    </>
  )
}
