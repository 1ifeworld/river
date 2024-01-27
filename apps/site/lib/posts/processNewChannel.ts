import { SignMessageModalUIOptions } from "@privy-io/react-auth";
import {
  Hash,
  toBytes,
  encodePacked,
  encodeAbiParameters,
  parseAbiParameters,
  Hex,
} from "viem";
import { relayNewChannel } from "@/lib";
import { channelRegistryABI, addresses } from "scrypt";

export async function processNewChannel({
  signer,
  targetUserId,
  channelUri,
  deadline,
  sig,
}: {
  signer: Hex;
  channelUri: string;
  targetUserId: bigint;
  deadline: bigint;
  sig: Hash;

  //   privySignMessage: (
  //     message: string,
  //     uiOptions?: SignMessageModalUIOptions | undefined,
  //   ) => Promise<string>
// }) {
  }): Promise<boolean> {

  const encodedChannelData = encodePacked(
    ["address", "string"],
    [addresses.stringRenderer.river_dev_2_d5hb5orqim, channelUri]
  );

  const encodedLogicData = encodeAbiParameters(
    parseAbiParameters("uint8[] roles"),
    [[Number(targetUserId)]]
  );

  const relaySuccess = await relayNewChannel({
    signer: signer,
    userId: targetUserId,
    channelData: encodedChannelData,
    logicData: encodedLogicData,
    deadline: deadline,
    signature: sig,
    pathsToRevalidate: ["/"],
  });

  return relaySuccess;
  /* 
        Take in the eip1193 client and sign
        eip712 typed data here
    */

  //   // Declare constants/params
  //   const postVersion = postTypes.v1
  //   const postExpiration: bigint = getExpiration()
  //   // generate encoded msgBody for createChannelMsg
  //   const createChannelMsg = encodeCreateChannel({
  //     uri: channelUri,
  //     adminIds: [targetUserId],
  //     memberIds: [],
  //     channelTags: [],
  //   })
  //   // add this in to prevent msgBody from being null
  //   if (!createChannelMsg) return false
  //   console.log('encoded msgBody correctly')
  //   // generate encodedMessage by packing msgType + msgBody together
  //   const encodedMessage = encodeMessage({
  //     msgType: Number(messageTypes.createChannel),
  //     msgBody: createChannelMsg.msgBody,
  //   })
  //   // add this in to prevent encodedMessage being null
  //   if (!encodedMessage) return false
  //   console.log('encoded message correctly')
  //   // generate the bytes[] messageArray
  //   const messageArray: Hash[] = [encodedMessage?.encodedMessage]
  //   // generate hash to include in post
  //   const postHash = generateHashForPostSig({
  //     version: postVersion,
  //     expiration: postExpiration,
  //     messageArray: messageArray,
  //   })
  //   const postHashForSig = remove0xPrefix({ bytes32Hash: postHash })
  //   // Get signature from user over signed hash of encodePacked version + expiration + messages
  //   // const sig = await privySignMessage(remove0xPrefix({bytes32Hash: postHash}))
  //   const sig = (await privySignMessage(postHashForSig)) as Hash
  //   // Encode data to post through Gateway
  //   const postInput = encodePost({
  //     userId: targetUserId,
  //     hashType: postTypes.hashScheme1,
  //     hash: postHash,
  //     sigType: postTypes.sigTypeECDSA,
  //     sig: sig,
  //     version: postVersion,
  //     expiration: postExpiration,
  //     messageArray: messageArray,
  //   })
  //   // add this in to prevent postInputs being null
  //   if (!postInput) return false
  //   console.log('postInput encoded correctly')

  //   // pass postInputs into the createPost server action
  //   const relaySuccess = await relayPost({
  //     postInput: postInput,
  //     pathsToRevalidate: ['/'],
  //   })
  //   // return relay success boolean value
  //   return relaySuccess
}
