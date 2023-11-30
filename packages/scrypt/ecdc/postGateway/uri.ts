import { Hash, decodeAbiParameters } from "viem";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeUri({ msgBody }: { msgBody: Hash }): {
  uri: string;
} | null {
  try {
    const [uri] = decodeAbiParameters(
      [{ name: "uri", type: "string" }],
      msgBody
    );

    return {
      uri: uri,
    };
  } catch (error) {
    console.error("Failed to decode URI", error);
    return null;
  }
}
