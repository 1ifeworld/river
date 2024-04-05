import { Grid, Typography } from '@/design-system'
import { getAllAdds } from '@/gql'
import { ItemCard } from '@/server'
import { ItemDropdown, PaginationControls } from '@/client'

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
      <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5 pb-[30px]">
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
      <div className="pb-[30px]">
        {/* @ts-ignore */}
        <PaginationControls pageInfo={pageInfo} />
      </div>
    </>
  )
}
