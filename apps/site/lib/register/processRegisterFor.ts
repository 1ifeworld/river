import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hash, Hex } from 'viem'
import { relayRegisterFor } from '@/lib'
import { getExpiration, registerForHash, remove0xPrefix } from 'scrypt'

export async function processRegisterFor({
  privySignerAddress,
  privySignMessage,
  username,
}: {
  privySignerAddress: string
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>
  username: string
}) {
  // Declare constants/params
  const sigExpiration: bigint = getExpiration()
  // Get the hash to be signed
  const hash = registerForHash({ expiration: sigExpiration })
  // Sign hash with privy. hash is first wrapped in eip191 wrapper.
  const sig = await privySignMessage(hash)
  // Check if sig generated
  if (!sig) return
  // pass inputs to relayRegisterFor
  const userId = await relayRegisterFor({
    registerForRecipient: privySignerAddress as Hex,
    expiration: sigExpiration,
    signature: sig as Hash,
    username: username,
    pathToRevalidate: '/',
  })
  return userId
}
