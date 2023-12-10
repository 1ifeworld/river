import Image from 'next/image'
import { type Item, type Channel } from '@/gql'
import { Stack, Typography } from '@/design-system'
import { Username } from '../Username'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import Link from 'next/link'

interface ThumbnailNameCreatorProps {
  channel: Channel
  item: Item
  metadata: any
}

export async function ThumbnailNameCreator({
  channel,
  item,
  metadata,
}: ThumbnailNameCreatorProps) {
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
        <Link href={`/channel/${channel.id}/${item.id}`}>
          <Typography className="text-primary-foreground">
            {itemMetadata.name}
          </Typography>
        </Link>
        <Username id={item.creatorId} />
      </Stack>
    </>
  )
}
