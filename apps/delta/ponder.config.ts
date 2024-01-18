import { createConfig } from '@ponder/core'
import { http } from 'viem'
import { addresses, idRegistryABI, postGatewayABI } from 'scrypt'

export default createConfig({
  networks: {    
    river_j5bpjduqfv: {
      chainId: 36912,
      transport: http("https://l2-river-j5bpjduqfv.t.conduit.xyz/"),
    },
    // anvil: {
    //   chainId: 31337,
    //   transport: http(process.env.ANVIL_FORK_URL)
    // }
  },
  contracts: {
    IdRegistry: {
      network: 'river_j5bpjduqfv',
      abi: idRegistryABI,
      address: addresses.idRegistry.river_j5bpjduqfv,
      startBlock: 0,
    },
    PostGateway: {
      network: 'river_j5bpjduqfv',
      abi: postGatewayABI,
      address: addresses.postGateway.river_j5bpjduqfv,
      startBlock: 0,
    },
    // IdRegistry: {
    //   network: "anvil",
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
