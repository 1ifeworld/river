import { Grid } from '@river/design-system'
import { Listing } from '../../../gql/sdk.generated'
import { ListingCard } from '../../client'

export function ChannelBody({ listings }: { listings: Listing[] }) {
  if (!listings || listings.length === 0) {
    return <div>No Listings available.</div>
  }

  return (
    <Grid className="grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] gap-5 pb-4">
      {listings.map((listing: Listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </Grid>
  )
}
