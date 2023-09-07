import { Hex, getAddress } from "viem"; // Assuming you have this import in your original file

// Define a type for a numeric string (e.g., "123")
export type NumericString = `${number}`;

// Define a type for a listing ID which follows a specific pattern
export type ListingId = `${NumericString}/${Hex}/${string}`;

// Utility function to check if a given string is a valid hexadecimal value
export function isValidHex(value: string): value is Hex {
  return /^0x[a-fA-F0-9]+$/.test(value);
}

// Utility function to check if a given string is a valid numeric string
export function isValidNumericString(value: string): value is NumericString {
  return /^\d+$/.test(value);
}

// Function to validate the route parameters and return the constructed listing ID if valid
export function validateRoute(params: { contract: Hex; id: string }): { success: boolean; error?: string; constructListingId?: ListingId } {
  let success = true;
  let error: string | undefined = undefined;

  if (!isValidHex(params.contract)) {
    success = false;
    error = "Contract input was valid type";
  }

  if (success && !isValidNumericString(params.id)) {
    success = false;
    error = "Invalid ID provided.";
  }

  let constructListingId: ListingId | undefined;
  if (success) {
    constructListingId = `${1}/${getAddress(params.contract) as Hex}/${params.id}`;
  }

  return { success, error, constructListingId };
}
