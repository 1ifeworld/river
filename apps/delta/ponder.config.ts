import { createConfig } from '@ponder/core'
import { addresses, idRegistryABI, postGateway2ABI } from 'scrypt'
import { http } from 'viem'

export default createConfig({
  networks: {
    // river_j5bpjduqfv: {
    //   chainId: 36912,
    //   transport: http(process.env.PONDER_RPC_URL_36912),
    // },
    anvil: {
      chainId: 31337,
      transport: http(process.env.ANVIL_FORK_URL),
    },
  },
  contracts: {
    // IdRegistry: {
    //   network: 'river_j5bpjduqfv',
    //   abi: idRegistryABI,
    //   address: addresses.idRegistry.river_j5bpjduqfv,
    //   startBlock: 0,
    // },
    // PostGateway: {
    //   network: 'river_j5bpjduqfv',
    //   abi: postGatewayABI,
    //   address: addresses.postGateway.river_j5bpjduqfv,
    //   startBlock: 0,
    // },
    IdRegistry: {
      network: 'anvil',
      abi: idRegistryABI,
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      startBlock: 0,
    },
    PostGateway: {
      network: 'anvil',
      abi: postGateway2ABI,
      address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
      startBlock: 0,
    },
  },
})
