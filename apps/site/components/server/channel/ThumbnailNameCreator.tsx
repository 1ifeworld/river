import { Button, Stack, Typography } from '@/design-system'
import { type Channel, type Reference } from '@/gql'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import { GenericThumbnailSmall, Username } from '@/server'
import { truncateText } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ThumbnailNameCreatorProps {
  channel: Channel
  reference: Reference
  metadata: any
}

export function ThumbnailNameCreator({
  channel,
  reference,
  metadata,
}: ThumbnailNameCreatorProps) {
  const referenceMetadata = metadata.data[reference.pubRef?.uri as string]

  if (!referenceMetadata) {
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

  const cid = ipfsUrlToCid({ ipfsUrl: referenceMetadata.image })

  return (
    <>
      {cid ? (
        <Image
          className="object-cover aspect-square "
          src={pinataUrlFromCid({ cid })}
          alt={referenceMetadata.name}
          width={40}
          height={40}
        />
      ) : (
        <GenericThumbnailSmall
          text={referenceMetadata.name ? referenceMetadata.name : '?'}
        />
      )}
      <Stack>
        {/* <Link href={`/item/${reference.id}`}> */}
        {/* <Button variant="link"> */}
        {/* This component is hidden on large screens */}
        <Typography className="md:hidden text-primary-foreground">
          {truncateText(referenceMetadata.name, 35)}
        </Typography>
        {/* This component is hidden on small screens */}
        <Typography className="hidden md:block text-primary-foreground">
          {truncateText(referenceMetadata.name, 50)}
        </Typography>
        {/* </Button> */}
        {/* </Link> */}
        <Username id={reference.createdBy} />
      </Stack>
    </>
  )
}
