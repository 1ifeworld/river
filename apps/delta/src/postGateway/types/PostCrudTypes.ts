import { Hash } from "viem";

export type MessageToProcess = {
    msgType: bigint;
    msgBody: Hash;
  };