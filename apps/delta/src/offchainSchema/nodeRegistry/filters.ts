import { Hex, Hash } from "viem";
import { operator } from "@/constants";

export function isValidNodeRegistration({
    sender,
    nodeId,
    data,
  }: {
    sender: Hex;
    nodeId: BigInt;
    data: Hash;
  }) {
    // check if function was called by operator
    if (sender != operator) return false;
    return true;
  }
  