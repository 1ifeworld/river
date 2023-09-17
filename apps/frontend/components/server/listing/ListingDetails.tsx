import { Body, Headline, Stack } from '../../../../../packages/estuary/src'
import { getAddressDisplay } from '../../../utils'

export async function ListingDetails({ listing }: { listing: any }) {
  // Attempt to resolve relevant address/ens before component renders
  const creatorEnsOrAddress = await getAddressDisplay(
    listing?.listingTargetMetadata?.pieceCreator,
  )

  return (
    <Stack className="p-6 gap-4">
      <span className="inline-block pb-2">
        <Headline>{listing?.listingTargetMetadata?.pieceName}</Headline>
        <Body className="text-label-muted">{creatorEnsOrAddress}</Body>
      </span>
      <span className="inline-block">
        <Body className="text-label">
          {listing?.listingTargetMetadata?.pieceDescription}
        </Body>
      </span>
    </Stack>
  )
}
