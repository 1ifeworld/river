import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { relayRegisterFor } from 'lib/actions'
import { getExpiration, registerForHash, remove0xPrefix } from 'scrypt'
import {
  Hash,
  Hex,
  hashMessage,
  keccak256,
  recoverAddress,
  recoverMessageAddress,
} from 'viem'

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
  // const sigExpriration: bigint = BigInt(1734558342000);
  // Get the hash to be signed
  const hash = registerForHash({ expiration: sigExpiration })
  // Sign hash with privy. hash is first wrapped in eip191 wrapper.
  const sig = await privySignMessage(hash)
  // Check if sig generated
  if (!sig) return
  // pass inputs to relayRegisterFor
  await relayRegisterFor({
    registerForRecipient: privySignerAddress as Hex,
    expiration: sigExpiration,
    signature: sig as Hash,
    username: username,
    pathToRevalidate: '/',
  })
}
