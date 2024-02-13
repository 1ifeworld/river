import { Hash, Hex, zeroAddress } from 'viem'
import { relayRegisterFor } from '@/lib'

export async function processRegisterFor({
  signer,
  recovery = zeroAddress,
  deadline,
  sig,
}: {
  signer: Hex
  recovery?: Hex
  deadline: bigint
  sig: Hash
}) {
  const { success, hash, rid, error } = await relayRegisterFor({
    to: signer,
    recovery: recovery,
    deadline: deadline.toString(),
    sig: sig,
  })

  console.log('rid', rid)

  if (success && hash && rid) {
    console.log('Transaction Hash:', hash)
    console.log('rid registered successfuly', rid)
    return rid
  } else {
    console.error('Error in registration:', error)
    return null
  }
}
