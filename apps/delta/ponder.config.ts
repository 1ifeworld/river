import type { Config } from '@ponder/core'
import { http } from 'viem'
import {
  idRegistry,
  delegateRegistry,
  nodeRegistry,
  riverValidatorV1,
  lightAccountFactory,
  idRegistryABI,
  delegateRegistryABI,
  nodeRegistryABI,
  riverValidatorV1ABI
} from 'offchain-schema'

export const config: Config = {
  networks: [
    {
      name: 'optimism-goerli',
      chainId: 420,
      transport: http(process.env.PONDER_RPC_URL_420),
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
    //   address: idRegistry,
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
    //   address: delegateRegistry,
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
      address: nodeRegistry,
      startBlock: 16774340,
    },
    // {
    //   name: 'RiverValidatorV1',
    //   network: 'optimism-goerli',
    //   abi: riverValidatorV1ABI,
    //   address: riverValidatorV1,
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
    //   abi: './abis/LightAccountFactory.json',
    //   address: lightAccountFactory,
    //   startBlock: 16474518,
    // },
  ],
}
