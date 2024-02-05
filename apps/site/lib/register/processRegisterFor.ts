// import { SignMessageModalUIOptions } from '@privy-io/react-auth'
// import { Hash, Hex, zeroAddress } from 'viem'
// import { relayRegisterFor } from '@/lib'
// import { getExpiration, registerForHash, remove0xPrefix } from 'scrypt'

// export async function processRegisterFor({
//   signer,
//   recovery,
//   deadline,
//   sig,
//   // privySignMessage,
//   username,
// }: {
//   signer: Hex
//   recovery: Hex
//   deadline: bigint
//   sig: Hash
//   username: string
//   // privySignMessage: (
//   //   message: string,
//   //   uiOptions?: SignMessageModalUIOptions | undefined,
//   // ) => Promise<string>
//   // username: string
// }) {
//   await relayRegisterFor({
//     registerForRecipient: signer,
//     recovery: zeroAddress,
//     expiration: deadline,
//     signature: sig as Hash,
//     username: username,
//     pathToRevalidate: '/',
//   })

//   // Declare constants/params
//   // const sigExpiration: bigint = getExpiration()
//   // Get the hash to be signed
//   // const hash = registerForHash({ expiration: sigExpiration })
//   // Sign hash with privy. hash is first wrapped in eip191 wrapper.
//   // const sig = await privySignMessage(hash)
//   // Check if sig generated
//   // if (!sig) return
//   // // pass inputs to relayRegisterFor
//   // await relayRegisterFor({
//   //   registerForRecipient: signer,
//   //   recovery: recovery,
//   //   expiration: sigExpiration,
//   //   signature: sig as Hash,
//   //   username: username,
//   //   pathToRevalidate: '/',
//   // })
// }


import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { setUsername } from '@/lib'
import { Hash, Hex, zeroAddress } from 'viem'
import { relayRegisterFor } from '@/lib'
import { getTxnInclusion } from '@/lib'
import { getExpiration, registerForHash, remove0xPrefix } from 'scrypt'

// Define the User type based on the ABI
type User = {
  to: string
  recovery: string
  deadline: number | string | bigint
  sig: string
  username: string
}

export async function processRegisterFor({
  signer,
  recovery = zeroAddress,
  deadline,
  sig,
  username,
}: {
  signer: Hex
  recovery?: Hex
  deadline: bigint
  sig: Hash
  username: string
}) {
  const user: User = {
    to: signer,
    recovery: recovery,
    deadline: deadline.toString(), 
    sig: sig,
    username: username,
  }

    const { success, hash, rid, error } = await relayRegisterFor(user)

    console.log("rid", rid)
  
    if (success && hash && rid) {
      console.log("Transaction Hash:", hash)
          console.log("rid", rid)


      await setUsername({
        userIdRegistered: rid,
        signature: sig,
        timestamp: deadline.toString(),
        username: username,
        registerForRecipient: signer,
      })
      console.log(`Username ${username} set successfully.`)
      return true
    } else {
      console.error("Error in registration:", error)
      return false
    }
  }
