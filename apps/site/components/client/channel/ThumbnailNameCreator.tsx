import Image from 'next/image'
import { type Reference, type Channel } from '@/gql'
import { Stack, Typography, Button } from '@/design-system'
import { Username, GenericThumbnailSmall } from '@/client'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import Link from 'next/link'
import { truncateText } from '@/utils'
import { useMediaQuery } from '@/hooks'

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
  const { isMobile } = useMediaQuery()

  const referenceMetadata = metadata.data[reference.pubRef?.uri as string]

  if (!referenceMetadata) {
    return (
      <>
        <Image
          className="object-cover aspect-square "
          src={''}
          alt={''}
          width={38}
          height={38}
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
      <Link href={`/item/${reference.id}`}>
        <>
          {cid ? (
            <Image
              className="object-cover aspect-square "
              src={pinataUrlFromCid({ cid })}
              alt={referenceMetadata.name}
              width={38}
              height={38}
            />
          ) : (
            <GenericThumbnailSmall
              text={referenceMetadata.name ? referenceMetadata.name : '?'}
            />
          )}
        </>
      </Link>
      <Stack className="">
        <Link href={`/item/${reference.id}`}>
          <Button variant="link">
            <Typography className="text-primary-foreground">
              {isMobile
                ? truncateText(referenceMetadata.name, 35)
                : referenceMetadata.name}
            </Typography>
          </Button>
        </Link>
        <Username id={reference.createdBy} />
      </Stack>
    </>
  )
}
