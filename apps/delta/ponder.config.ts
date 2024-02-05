import { createConfig } from '@ponder/core'
import { addresses, idRegistryABI, postGateway2ABI } from 'scrypt'
import { http } from 'viem'

export default createConfig({
  networks: {
    arbitrumNova: {
      chainId: 42170,
      transport: http(process.env.PONDER_RPC_URL_42170)
    },
    // river_j5bpjduqfv: {
    //   chainId: 36912,
    //   transport: http(process.env.PONDER_RPC_URL_36912),
    // },
    // anvil: {
    //   chainId: 31337,
    //   transport: http(process.env.ANVIL_FORK_URL),
    // },
  },
  contracts: {
    IdRegistry: {
      network: 'arbitrumNova',
      abi: idRegistryABI,
      address: '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24',
      startBlock: 44780000,
    },
    PostGateway: {
      network: 'arbitrumNova',
      abi: postGateway2ABI,
      address: '0x05aD6cA9C2b3F71a6B30A8C7d414C95E10EC0217',
      // startBlock: 44780000,
      startBlock: 45761744,
    },    
    // IdRegistry: {
    //   network: 'anvil',
    //   abi: idRegistryABI,
    //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    //   startBlock: 0,
    // },
    // PostGateway: {
    //   network: 'anvil',
    //   abi: postGateway2ABI,
    //   address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    //   startBlock: 0,
    // },
  },
})
