import { Grid, Typography, Flex } from '@/design-system'
import { getAllAdds } from '@/gql'
import { ItemCard } from '@/server'
import { ItemDropdown, PaginationControls } from '@/client'

export const maxDuration = 30 // This function can run for a maximum of 30 seconds

export default async function Home({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // biome-ignore lint:
  const after = searchParams['after'] as string | undefined

  const { adds, pageInfo } = await getAllAdds({ limit: 100, after })

  if (!adds || !adds.items || adds?.items?.length === 0) {
    return <Typography>No items added yet</Typography>
  }

  return (
    <>
      <Grid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-[30px]">
        {adds.items.slice(0, 60).map((add, index) =>
          add.removed ? null : (
            <ItemCard
              key={index}
              // @ts-ignore
              add={add}
              dropdownComponent={
                <ItemDropdown
                  // @ts-ignore
                  channel={add.channel}
                  // @ts-ignore
                  add={add}
                  // @ts-ignore
                  item={add.item}
                  showRemove={false}
                />
              }
            />
          ),
        )}
      </Grid>
      <Flex className="pt-36 justify-center md:mr-[19%]">
        {/* @ts-ignore */}
        <PaginationControls pageInfo={pageInfo} />
      </Flex>
    </>
  )
}
