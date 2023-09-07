import { getListing } from "../../../../gql/requests/getListing";
import { Hex, isAddress } from "viem";
import { Flex } from "@river/design-system";
import { getAddress } from "viem";

// Define a type for a numeric string (e.g., "123")
type NumericString = `${number}`;

// Define a type for a listing ID which follows a specific pattern
type ListingId = `${NumericString}/${Hex}/${string}`;

// Utility function to check if a given string is a valid hexadecimal value
function isValidHex(value: string): value is Hex {
  return /^0x[a-fA-F0-9]+$/.test(value);
}

// Utility function to check if a given string is a valid numeric string
function isValidNumericString(value: string): value is NumericString {
  return /^\d+$/.test(value);
}

// Main server component function
export default async function View({
  params,
}: {
  params: { contract: Hex; id: string };
}) {
  // Initialize state variables
  let success = true; // Flag to track if the input validation and query are successful
  let error: string | null = null; // To store error messages, if any
  let queryResult: any; // To store the result of the query

  // Validate if the contract parameter is a valid Ethereum address
  if (!isAddress(params.contract)) {
    success = false;
    error = "Contract input was not an address";
  }

  // Validate if the ID parameter is a valid numeric string
  if (success && !isValidNumericString(params.id)) {
    success = false;
    error = "Invalid ID provided.";
  }

  // If all validations pass, construct the listing ID and fetch the listing data
  if (success) {
    const constructListingId: ListingId = `${1}/${
      getAddress(params.contract) as Hex
    }/${params.id}`;

    // Fetch the listing data using the constructed ID
    const { listings } = await getListing({
      id: constructListingId as string,
    });

    queryResult = listings; // Store the fetched data in the queryResult variable
  }

  // Render different components or elements based on the state variables

  // If there's an error, render the error message
  if (!success && error) {
    return <Flex className="flex-col">{error}</Flex>;
  }

  // If the query result is an empty array, render a message indicating no listings found
  if (queryResult && queryResult.length === 0) {
    return (
      <Flex className="flex-col">
        No listings found for the provided listingId
      </Flex>
    );
  }

  // If the query result has data, render the data
  if (queryResult && queryResult.length !== 0) {
    return (
      <Flex className="flex-col">Data: {JSON.stringify(queryResult)}</Flex>
    );
  }

  // Default render (e.g., while waiting for data or initial state)
  return <Flex className="flex-col">Loading...</Flex>;
}
