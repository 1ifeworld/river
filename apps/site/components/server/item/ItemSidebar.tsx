import { Typography, Stack, Flex } from '@/design-system'
import { kv } from '@vercel/kv'
import { getReferenceWithId } from '@/gql'
import { type MediaAssetObject, getUsername } from '@/lib'

export async function ItemSidebar({ itemId }: { itemId: string }) {
  const { reference } = await getReferenceWithId({
    id: itemId,
  })

  if (!reference || !reference.channel) {
    return <Typography>Not a valid item</Typography>
  }

  const username = await getUsername({ id: reference?.pubRef?.createdBy })

  const itemMetadata = await kv.get<Pick<MediaAssetObject, 'value'>['value']>(
    reference?.pubRef?.uri as string,
  )

  return (
    <Stack className="px-5 py-[10px] h-full justify-between">
      {/* Info / Index */}
      <div>
        <Flex className="gap-x-4 items-center">
          <Typography>Info</Typography>
          <Typography className="text-secondary-foreground">Index</Typography>
        </Flex>
        <Stack className="pt-[30px] gap-y-5">
          <div>
            <Typography>{itemMetadata?.name}</Typography>
            <Typography className="text-secondary-foreground">
              {username}
            </Typography>
          </div>
          <Typography>{'--'}</Typography>
        </Stack>
      </div>
      {/* Actions */}
      <Typography>Add to channel/Download</Typography>
    </Stack>
  )
}
