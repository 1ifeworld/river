import { Flex, Stack, Typography } from '@/design-system'
import { type Reference } from '@/gql'
import { getUsername, type MediaAssetObject, pinataUrlFromCid } from '@/lib'
import { unixTimeConverter } from '@/utils'
import { kv } from '@vercel/kv'
import Image from 'next/image'
import Link from 'next/link'
import { GenericThumbnailLarge } from '@/server'

export async function ItemCard({
  reference,
}: {
  reference: Reference
}) {
  const username = await getUsername({ id: reference?.pubRef?.createdBy })
  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    reference?.pubRef?.uri as string,
  )

  const renderableThumbnailTypes = ['image/png', 'image/gif', 'image/jpeg']

  return (
    <Stack className="gap-y-[10px]">
      <Link href={`/item/${reference?.id}`} className="transition-all">
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
      </Link>
      <Stack className="gap-y-[10px]">
        <div>
          <Link
            href={`/item/${reference?.id}`}
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
          {unixTimeConverter(reference?.pubRef?.createdTimestamp)}
        </Typography>
      </Stack>
    </Stack>
  )
}
