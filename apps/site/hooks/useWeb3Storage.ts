import { configStorageClient } from '@/lib'
import { extract } from '@ucanto/core/delegation'
import { type Client, create } from '@web3-storage/w3up-client'
import * as React from 'react'

export function useWeb3Storage() {
  const [client, setClient] = React.useState<Client | null>(null)

  React.useEffect(() => {
    // biome-ignore format: prevent unnecessary semicolon
    (async () => {
      /**
       * Create a new client instance
       */
      const client = await create()
      /**
       * Fetch a delegation on the server for the frontend
       */
      const delegationResponse = await configStorageClient({ did: client.agent.did() })
      /**
       * Deserialize the delegation
       */
      const delegation = await extract(new Uint8Array(delegationResponse as Uint8Array))
      if (!delegation.ok) {
        throw new Error('Failed to extract delegation', {
          cause: delegation.error,
        })
      }
      /**
       * Add proof that this agent has been delegated capabilities on the space
       */
      const space = await client.addSpace(delegation.ok)
      client.setCurrentSpace(space.did())
      /**
       * Set the client in state
       */
      setClient(client)
    })()
  }, [])

  return {
    client,
  }
}
