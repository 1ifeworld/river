import Image from 'next/image'
import { type Reference, type Channel } from '@/gql'
import { Stack, Typography } from '@/design-system'
import { GenericThumbnailSmall, Username } from '@/server'
import { ipfsUrlToCid, pinataUrlFromCid } from '@/lib'
import { truncateText } from '@/utils'

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
      <Stack>
        {/* <Link href={`/item/${reference.id}`}> */}
          {/* <Button variant="link"> */}
            {/* */}
            <Typography className="md:hidden text-primary-foreground">
              {truncateText(referenceMetadata.name, 35)}
            </Typography>
            <Typography className="hidden md:block text-primary-foreground leading-none">
              {referenceMetadata.name}
            </Typography>            
            {/* */}
          {/* </Button> */}
        {/* </Link> */}
        <Username id={reference.createdBy} />
      </Stack>
    </>
  )
}
