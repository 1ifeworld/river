import { Grid } from '@/design-system'
import { getAllReferences } from '@/gql'
import { ItemCard } from '@/server'

export default async function Home() {
  const { references } = await getAllReferences()

  return (
    <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5 py-[30px]">
      {references.map((reference, index: number) => (
        <ItemCard key={index} reference={reference} />
      ))}
    </Grid>
  )
}
