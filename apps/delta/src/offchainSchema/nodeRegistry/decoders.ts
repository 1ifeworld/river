import { Hash, decodeAbiParameters, parseAbiParameters } from "viem";
import { nodeRegistrationData } from "./types";

export function decodeNodeRegistrationData({ data }: { data: Hash }): {
  userId: bigint;
  schema: Hash;
  regType: bigint;
  regBody: Hash;
} {
  
  const [decodedData] = decodeAbiParameters(
    nodeRegistrationData[0].outputs,
    data
  );

  return decodedData;
}
