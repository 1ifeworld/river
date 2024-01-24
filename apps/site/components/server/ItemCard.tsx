import { Flex, Stack, Typography } from '@/design-system'
import { type Publication } from '@/gql'
import { getUsername, type MediaAssetObject, pinataUrlFromCid } from '@/lib'
import { unixTimeConverter } from '@/utils'
import { kv } from '@vercel/kv'
import Image from 'next/image'
import Link from 'next/link'
import { GenericThumbnailLarge } from '@/server'

export async function ItemCard({
  publication,
}: {
  publication: Publication
}) {
  const username = await getUsername({ id: publication.createdBy })
  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    publication.uri,
  )

  const renderableThumbnailTypes = ['image/png', 'image/gif', 'image/jpeg']

  return (
    <Stack className="gap-y-[10px]">
      <Stack className="relative aspect-[5/6] justify-center items-center">
        {renderableThumbnailTypes.includes(
          itemMetadata?.contentType as string,
        ) ? (
          <Image
            className="object-contain"
            src={pinataUrlFromCid({ cid: itemMetadata?.image as string })}
            alt={itemMetadata?.name as string}
            fill
            quality={100}
            priority={true}
          />
        ) : (
          <GenericThumbnailLarge text={itemMetadata?.contentType as string} />
        )}
      </Stack>
      <Stack className="gap-y-[10px]">
        <div>
          <Link
            href={`/item/${publication.id}`}
            className="hover:underline underline-offset-2 transition-all"
          >
            <Typography className="truncate">
              {itemMetadata?.name ?? 'untitled'}
            </Typography>
          </Link>
          <Flex className="items-center">
            <Typography className="text-secondary-foreground">
              {username ?? ''}
            </Typography>
            {/* TODO: Add which channel the item belongs to */}
          </Flex>
        </div>
        <Typography className="text-secondary-foreground">
          {unixTimeConverter(publication.createdTimestamp)}
        </Typography>
      </Stack>
    </Stack>
  )
}
