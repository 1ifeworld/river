import { createConfig } from '@ponder/core'
import { http } from 'viem'
import { addresses, idRegistryABI, postGatewayABI } from 'scrypt'

export default createConfig({
  networks: {
    opGoerli: {
      chainId: 420,
      transport: http(process.env.PONDER_RPC_URL_420),
    },
    // anvil: {
    //   chainId: 31337,
    //   transport: http(process.env.ANVIL_FORK_URL)
    // }
  },
  contracts: {
    IdRegistry: {
      network: 'opGoerli',
      abi: idRegistryABI,
      address: addresses.idRegistry.opGoerli,
      startBlock: 18623300,
    },
    PostGateway: {
      network: 'opGoerli',
      abi: postGatewayABI,
      address: addresses.postGateway.opGoerli,
      startBlock: 18623300,
    },
    // IdRegistry: {
    //   network: "anvil", hii
    //   abi: idRegistryABI,
    //   address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    //   startBlock: 0
    // },
    // PostGateway: {
    //   network: "anvil",
    //   abi: postGatewayABI,
    //   address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    //   startBlock: 0
    // }
  },
})
