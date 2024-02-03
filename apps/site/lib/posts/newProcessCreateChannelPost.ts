import { SignMessageModalUIOptions } from "@privy-io/react-auth";
import { Hash, Hex } from "viem";
import { newRelayPost } from "@/lib";
import {
  getExpiration,
  remove0xPrefix,
  generateMessageHash,
  encodeCreateChannelMsgBody,
} from "scrypt";

export async function newProcessCreateChannelPost({
  signer,
  name,
  description,
  rid,
  privySignMessage,
}: {
  signer: Hex;
  name: string;
  description: string;
  rid: bigint;
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined
  ) => Promise<string>;
}): Promise<boolean> {
  // Declare constants/params
  const msgTimestamp: bigint = getExpiration(); // gives 120s buffer
  const msgType: number = 3;
  const msgBody = await encodeCreateChannelMsgBody({
    name: name,
    description: description,
    admins: [rid],
    members: [],
  });
  if (!msgBody?.msgBody) return false;
  // generate hash to include in post
  const messageHash = generateMessageHash({
    rid: rid,
    timestamp: msgTimestamp,
    msgType: msgType,
    msgBody: msgBody.msgBody,
  });
  const msgHashForSig = remove0xPrefix({ bytes32Hash: messageHash });
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  // const sig = await privySignMessage(remove0xPrefix({bytes32Hash: postHash}))
  const sig = (await privySignMessage(msgHashForSig)) as Hash;
  // pass postInputs into the createPost server action
  const relaySuccess = await newRelayPost({
    signer: signer,
    msgRid: rid,
    msgTimestamp: msgTimestamp,
    msgType: msgType,
    msgBody: msgBody.msgBody,
    hashType: 1,
    hash: messageHash,
    sigType: 1,
    sig: sig,
    pathsToRevalidate: ["/"],
  });
  // return relay success boolean value
  return relaySuccess;
}
