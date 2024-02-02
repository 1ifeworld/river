import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash, Hex, zeroAddress } from 'viem'
import { relayRegisterFor } from '@/lib'
import { getExpiration, registerForHash, remove0xPrefix } from 'scrypt'

export async function processRegisterFor({
  signer,
  recovery,
  deadline,
  sig,
  // privySignMessage,
  username,
}: {
  signer: Hex
  recovery: Hex
  deadline: bigint
  sig: Hash,
  username: string

  // privySignMessage: (
  //   message: string,
  //   uiOptions?: SignMessageModalUIOptions | undefined,
  // ) => Promise<string>
  // username: string
}) {

  await relayRegisterFor({
    registerForRecipient: signer,
    recovery: zeroAddress,
    expiration: deadline,
    signature: sig as Hash,
    username: username,
    pathToRevalidate: '/',
  })


  // // Declare constants/params
  // const sigExpiration: bigint = getExpiration()
  // // Get the hash to be signed
  // const hash = registerForHash({ expiration: sigExpiration })
  // // Sign hash with privy. hash is first wrapped in eip191 wrapper.
  // const sig = await privySignMessage(hash)
  // // Check if sig generated
  // if (!sig) return
  // pass inputs to relayRegisterFor
  // await relayRegisterFor({
  //   registerForRecipient: privySignerAddress as Hex,
  //   expiration: sigExpiration,
  //   signature: sig as Hash,
  //   username: username,
  //   pathToRevalidate: '/',
  // })
}