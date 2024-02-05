import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash, Hex } from 'viem'
import { relayPost } from '@/lib'
import { getTxnInclusion } from '@/lib'
import {
  getExpiration,
  remove0xPrefix,
  generateMessageHash,
  encodeCreateChannelMsgBody,
} from 'scrypt'
import { revalidatePath } from 'next/cache'


export async function newProcessCreateChannelPost({
  signer,
  name,
  description,
  rid,
  pathsToRevalidate,
  privySignMessage,
}: {
  signer: Hex
  name: string
  description: string
  rid: bigint
  pathsToRevalidate: string[]
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
}): Promise<boolean> {
  // Declare constants/params
  const msgTimestamp: bigint = getExpiration() // gives 120s buffer
  const msgType: number = 3
  const msgBody = await encodeCreateChannelMsgBody({
    name: name,
    description: description,
    admins: [rid],
    members: [],
  })
  if (!msgBody?.msgBody) return false
  // generate hash to include in post
  const messageHash = generateMessageHash({
    rid: rid,
    timestamp: msgTimestamp,
    msgType: msgType,
    msgBody: msgBody.msgBody,
  })
  const msgHashForSig = remove0xPrefix({ bytes32Hash: messageHash })
  // Get signature from user over signed hash of encodePacked version + expiration + messages
  // const sig = await privySignMessage(remove0xPrefix({bytes32Hash: postHash}))
  const sig = (await privySignMessage(msgHashForSig)) as Hash
  // pass postInputs into the createPost server action

  const post = {
    signer: signer,
    message: {
      rid: rid,
      timestamp: msgTimestamp,
      msgType: msgType,
      msgBody: msgBody.msgBody,
    },
    hashType: 1,
    hash: messageHash,
    sigType: 1,
    sig: sig,
  }
  
  try {
    const relayResponse = await relayPost(post)

    if (relayResponse.success) {
      console.log("Channel created with hash:", relayResponse.hash)

      const transactionHash = relayResponse.hash
      console.log("Transaction Hash:", transactionHash)
  
      const txnInclusion = await getTxnInclusion(transactionHash)

      if (txnInclusion) {
        pathsToRevalidate.forEach((path) => revalidatePath(path))
        return true 
        
      } else {
        console.error("Transaction was not included successfully.")
        return false 
      }
    } else {
      console.error("Relay Post was not successful.")
      return false 
    }
  } catch (error) {
    console.error("Error relaying post:", error)
    return false 
  } 
}