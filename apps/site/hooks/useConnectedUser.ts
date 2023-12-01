import * as React from 'react'
import { useUserContext } from 'context/UserContext'
import { getUserId } from '@/gql'
import { getUsername } from '@/lib'
import { type Address } from 'viem'

export function useConnectedUser() {
  const [userId, setUserId] = React.useState<bigint>()
  const [username, setUsername] = React.useState<string>()

  const { smartAccountAddress } = useUserContext()

  React.useEffect(() => {
    /* biome-ignore format: */
    (async () => {
      if (!smartAccountAddress) {
        return
      }

      const { userId } = await getUserId({
        custodyAddress: smartAccountAddress as Address,
      })

      setUserId(userId as bigint)

      const username = await getUsername({
        id: BigInt(userId as bigint),
      })

      setUsername(username.slice(0, -11))
    })()
  }, [smartAccountAddress])

  return {
    userId,
    username,
  }
}
