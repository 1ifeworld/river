import { Grid, Typography } from '@/design-system'
import { getAllAdds } from '@/gql'
import { ItemCard } from '@/server'
import { ItemDropdown } from '@/client'

export default async function Home() {
  console.log("what is my graphql endpoint: ", process.env.NEXT_PUBLIC_GRAPHQL_API)
  
  const { adds } = await getAllAdds()

  if (!adds || !adds.items || adds?.items?.length === 0) {
    return <Typography>No items added yet</Typography>
  }

  return (
    <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5 pb-[30px]">
      {adds.items.map((add, index) =>
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
  )
}
