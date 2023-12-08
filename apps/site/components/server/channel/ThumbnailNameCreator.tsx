import Image from 'next/image'
import { Item } from '@/gql'
import { Stack, Typography } from '@/design-system'
import { Username } from '../Username'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'

export async function ThumbnailNameCreator({
  item,
  metadata,
}: { item: Item; metadata: any }) {
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

  const cid = ipfsUrlToCid({ ipfsUrl: itemMetadata.image })

  return (
    <>
      <Image
        className="object-cover aspect-square "
        src={pinataUrlFromCid({ cid })}
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
