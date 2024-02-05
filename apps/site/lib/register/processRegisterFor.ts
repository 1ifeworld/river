import { setUsername } from '@/lib'
import { Hash, Hex, zeroAddress } from 'viem'
import { relayRegisterFor } from '@/lib'

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

  console.log('rid', rid)

  if (success && hash && rid) {
    console.log('Transaction Hash:', hash)
    console.log('rid', rid)

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
    console.error('Error in registration:', error)
    return false
  }
}
