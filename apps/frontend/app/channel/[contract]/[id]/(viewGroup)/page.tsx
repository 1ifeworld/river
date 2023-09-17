import { ListingView } from '@/server'
import { validateRoute } from '@/utils'
import { getListing, type Listing } from '@/gql'
import { Hex } from 'viem'

/**
 * The main server component function responsible for validating the route parameters,
 * fetching the relevant listing data based on the parameters, and rendering the ListingView component.
 *
 * @param params - An object containing the contract and id parameters.
 * @param params.contract - The contract parameter, expected to be of type Hex.
 * @param params.id - The id parameter, expected to be a string representing a number.
 *
 * @returns A JSX element, which is the ListingView component with the fetched listings and potential error as props.
 */
export default async function View({
  params,
}: {
  params: { contract: Hex; id: string }
}) {
  // Validate the provided route parameters using the validateRoute utility function.
  // This function checks the validity of the contract and id parameters and returns:
  // - success: a boolean indicating if the parameters are valid.
  // - error: a string containing an error message if the parameters are invalid.
  // - constructListingId: a constructed listing ID if the parameters are valid.
  const { success, error, constructListingId } = validateRoute(params)

  // Initialize an array to store the fetched listings.
  let queryResult: Listing[] = []

  // If the route parameters are valid and we have a constructed listing ID,
  // proceed to fetch the listing data using the getListing function.
  if (success && constructListingId) {
    const { listings } = await getListing({
      id: constructListingId as string,
    })
    queryResult = listings
  }

  // Render the ListingView component, passing the fetched listings and potential error message as props.
  return <ListingView listings={queryResult} error={error} />
}
