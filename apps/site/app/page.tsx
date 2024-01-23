import { Grid, Stack } from '@/design-system'
import { getAllPublications } from '@/gql'
import { ItemCard, Footer } from '@/server'

export default async function Home() {
  const { publications } = await getAllPublications()

  return (
    <Stack className="justify-between h-[100dvh] pt-12 md:pt-20">
      <Grid className="grid-cols-2 md:grid-cols-[repeat(auto-fill,_minmax(255px,_1fr))] gap-5 py-[30px]">
        {publications.map((publication, index: number) => (
          <ItemCard key={index} publication={publication} />
        ))}
      </Grid>
      <Footer />
    </Stack>
  )
}
