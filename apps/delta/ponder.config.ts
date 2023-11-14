import type { Config } from '@ponder/core'
import { http } from 'viem'
import {
  addresses,
  idRegistryABI,
  delegateRegistryABI,
  nodeRegistryABI,
  riverValidatorV1ABI,
  lightAccountFactoryABI
} from '../../packages/scrypt'

export const config: Config = {
  networks: [
    {
      name: 'optimism-goerli',
      chainId: 420,
      transport: http(process.env.PONDER_RPC_URL_420),
      // name: 'arbitrum-goerli',
      // chainId: 421613,
      // transport: http(process.env.PONDER_RPC_URL_421613),      
      // name: 'anvil',
      // chainId: 31337,
      // transport: http(process.env.ANVIL_FORK_URL),
    },
  ],
  contracts: [
    // {
    //   name: 'IdRegistry',
    //   network: 'optimism-goerli',
    //   abi: idRegistryABI,
    //   address: addresses.idRegistry.opGoerli,
    //   startBlock: 16474518,
    // },
    // {
    //   name: 'IdRegistry',
    //   network: 'anvil',
    //   abi: idRegistryABI,
    //   address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    // },
    // {
    //   name: 'DelegateRegistry',
    //   network: 'optimism-goerli',
    //   abi: delegateRegistryABI,
    //   address: addresses.delegateRegistry.opGoerli,
    //   startBlock: 16474518,
    // },
    // {
    //   name: 'DelegateRegistry',
    //   network: 'anvil',
    //   abi: delegateRegistryABI,
    //   address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    // },
    // {
    //   name: 'NodeRegistry',
    //   network: 'anvil',
    //   abi: nodeRegistryABI,
    //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    // },
    {
      name: 'NodeRegistry',
      network: 'optimism-goerli',
      abi: nodeRegistryABI,
      address: addresses.nodeRegistry.opGoerli,
      startBlock: 16774340,
    },
    // {
    //   name: 'NodeRegistry',
    //   network: 'arbitrum-goerli',
    //   abi: nodeRegistryABI,
    //   address: addresses.nodeRegistry.arbGoerli,
    //   startBlock: 54683831,
    // },    
    // {
    //   name: 'RiverValidatorV1',
    //   network: 'optimism-goerli',
    //   abi: riverValidatorV1ABI,
    //   address: addresses.riverValidatorV1.opGoerli,
    //   startBlock: 16474518,
    // },
    // {
    //   name: 'RiverValidatorV1',
    //   network: 'anvil',
    //   abi: riverValidatorV1ABI,
    //   address: riverValidatorV1,
    // },
    // {
    //   name: 'LightAccountFactory',
    //   network: 'optimism-goerli',
    //   abi: 'lightAccountFactoryABI',
    //   address: addresses.lightAccountFactory.opGoerli,
    //   startBlock: 16474518,
    // },
  ],
}
