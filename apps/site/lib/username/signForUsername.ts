import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { Hex } from 'viem'
import { prepareForSetUsername } from './setUsername'

export async function signForUsername({
  userId,
  username,
  registerForRecipient,
  privySignMessage,
}: {
  userId: bigint | string,
  username: string,
  registerForRecipient: Hex,
  privySignMessage: (
    message: string,
    uiOptions?: SignMessageModalUIOptions | undefined,
  ) => Promise<string>,
}): Promise<boolean> { 
  const messageToSign = JSON.stringify({
    userIdRegistered: String(userId),
    username,
    registerForRecipient,
  })

  try {
    const signature = await privySignMessage(messageToSign)

    await prepareForSetUsername({
      userIdRegistered: String(userId),
      username,
      registerForRecipient,
      signature: signature as Hex,
    })

    return true 
  } catch (error) {
    console.error('Error in prepUsername:', error)
    return false
  }
}