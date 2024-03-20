import { createConfig } from '@ponder/core'
import { addresses, idRegistryABI, postGatewayABI } from 'scrypt'
import { Hex, http } from 'viem'

export default createConfig({
  networks: {
    arbitrumNova: {
      chainId: 42170,
      transport: http(process.env.PONDER_RPC_URL_42170)
    },
    optimism: {
      chainId: 10,
      transport: http(process.env.PONDER_RPC_URL_10)
    },
  },
  contracts: {
    IdRegistry: {
      network: 'optimism',
      abi: idRegistryABI,
      address: addresses.idRegistry.optimism,
      startBlock: 115761578, // River genesis
    },
    PostGateway: {
      network: 'arbitrumNova',
      abi: postGatewayABI,
      address: process.env.NEXT_PUBLIC_POSTGATEWAY as Hex,
      startBlock: 45799650, // River genesis
    },    
  },
})
