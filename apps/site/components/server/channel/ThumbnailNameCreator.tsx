import { Stack, Typography } from '@/design-system'
import { type Item } from '@/gql'
import { ipfsUrlToCid, w3sUrlFromCid } from '@/lib'
import { GenericThumbnailSmall, Username } from '@/server'
import { truncateText } from '@/utils'
import Image from 'next/image'

interface ThumbnailNameCreatorProps {
  item: Item
  // biome-ignore lint:
  metadata: any
}

export function ThumbnailNameCreator({
  item,
  metadata,
}: ThumbnailNameCreatorProps) {
  if (!item) {
    return (
      <>
        <Image
          className="object-cover aspect-square "
          src={''}
          alt={''}
          width={40}
          height={40}
        />
        <Stack>
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
        <Stack>
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
          className="object-cover aspect-square hover:cursor-pointer"
          src={w3sUrlFromCid({ cid })}
          alt={itemMetadata.name}
          width={40}
          height={40}
        />
      ) : (
        <GenericThumbnailSmall
          className="hover:cursor-pointer"
          text={itemMetadata?.contentType as string}
        />
      )}
      <Stack className='gap-y-[3px]'>
        {/* This component is hidden on large screens */}
        <Typography className="hover:cursor-pointer md:hidden hover:underline text-primary-foreground leading-none whitespace-nowrap">
          {truncateText(itemMetadata.name, 35, false)}
        </Typography>
        {/* This component is hidden on small screens */}
        <Typography className="hover:cursor-pointer hidden md:block hover:underline text-primary-foreground leading-none whitespace-nowrap">
          {truncateText(itemMetadata.name, 35, true)}
        </Typography>
        <Username id={item.createdById} />
      </Stack>
    </>
  )
}
