import Image from 'next/image'
import { type Reference, type Channel } from '@/gql'
import { Stack, Typography, Button } from '@/design-system'
import { Username } from '../Username'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import Link from 'next/link'

interface ThumbnailNameCreatorProps {
  channel: Channel
  reference: Reference
  metadata: any
}

export async function ThumbnailNameCreator({
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
      <Link href={`/item/${reference.id}`}>
        <Image
          className="object-cover aspect-square "
          src={pinataUrlFromCid({ cid })}
          alt={referenceMetadata.name}
          width={40}
          height={40}
        />
      </Link>
      <Stack className="">
        <Link href={`/item/${reference.id}`}>
          <Button variant="link">
            <Typography className="text-primary-foreground">
              {referenceMetadata.name}
            </Typography>
          </Button>
        </Link>
        <Username id={reference.createdBy} />
      </Stack>
    </>
  )
}
