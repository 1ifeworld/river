import { createConfig } from '@ponder/core'
import { http } from 'viem'
import { 
  addresses, 
  idRegistryABI, 
  delegateRegistryABI, 
  channelRegistryABI, 
  itemRegistryABI,
  roleBasedAccessABI
} from 'scrypt'

export default createConfig({
  networks: {    
    river_dev_2_d5hb5orqim: {
      chainId: 3600855875265181,
      transport: http(process.env.PONDER_RPC_URL_3600855875265181),
    },
    // anvil: {
    //   chainId: 31337,
    //   transport: http(process.env.ANVIL_FORK_URL)
    // }
  },
  contracts: {
    IdRegistry: {
      network: 'river_dev_2_d5hb5orqim',
      abi: idRegistryABI,
      address: addresses.idRegistry.river_dev_2_d5hb5orqim,
      startBlock: 0,
    },
    DelegateRegistry: {
      network: 'river_dev_2_d5hb5orqim',
      abi: delegateRegistryABI,
      address: addresses.delegateRegistry.river_dev_2_d5hb5orqim,
      startBlock: 0,
    },    
    ChannelRegistry: {
      network: 'river_dev_2_d5hb5orqim',
      abi: channelRegistryABI,
      address: addresses.channelRegistry.river_dev_2_d5hb5orqim,
      startBlock: 0,
    },        
    ItemRegistry: {
      network: 'river_dev_2_d5hb5orqim',
      abi: itemRegistryABI,
      address: addresses.itemRegistry.river_dev_2_d5hb5orqim,
      startBlock: 0,
    },      
    RoleBasedAccess: {
      network: 'river_dev_2_d5hb5orqim',
      abi: roleBasedAccessABI,
      address: addresses.roleBasedAccess.river_dev_2_d5hb5orqim,
      startBlock: 0,
    },     
    // PostGateway: {
    //   network: 'river_j5bpjduqfv',
    //   abi: postGatewayABI,
    //   address: addresses.postGateway.river_j5bpjduqfv,
    //   startBlock: 0,
    // },
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
