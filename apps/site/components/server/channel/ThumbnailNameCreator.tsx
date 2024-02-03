import { Button, Stack, Typography } from '@/design-system'
import { type Channel, type Item } from '@/gql'
import { ipfsUrlToCid, w3sUrlFromCid } from '@/lib'
import { GenericThumbnailSmall, Username } from '@/server'
import { truncateText } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ThumbnailNameCreatorProps {
  channel: Channel
  item: Item
  metadata: any
}

export function ThumbnailNameCreator({
  channel,
  item,
  metadata,
}: ThumbnailNameCreatorProps) {
  if (!item || item?.createdby) {
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
  
  const itemMetadata = metadata.data[item.uri as string]

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
      {cid ? (
        <Image
          className="object-cover aspect-square "
          src={w3sUrlFromCid({ cid })}
          alt={itemMetadata.name}
          width={40}
          height={40}
        />
      ) : (
        <GenericThumbnailSmall
          text={itemMetadata?.contentType as string}
        />
      )}
      <Stack>
        {/* <Link href={`/item/${reference.id}`}> */}
        {/* <Button variant="link"> */}
        {/* This component is hidden on large screens */}
        <Typography className="md:hidden text-primary-foreground leading-none whitespace-nowrap">
          {truncateText(itemMetadata.name, 35)}
        </Typography>
        {/* This component is hidden on small screens */}
        <Typography className="hidden md:block text-primary-foreground leading-none whitespace-nowrap">
          {truncateText(itemMetadata.name, 50)}
        </Typography>
        {/* </Button> */}
        {/* </Link> */}
        <Username id={item.createdby} />
      </Stack>
    </>
  )
}
