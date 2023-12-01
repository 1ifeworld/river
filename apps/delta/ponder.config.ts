import type { Config } from '@ponder/core'
import { http } from 'viem'
import {
  addresses,
  idRegistryABI,
  delegateRegistryABI,
  attestationRegistryABI,
  postGatewayABI,
  riverValidatorV1ABI,
  lightAccountFactoryABI,
} from 'scrypt'


export const config: Config = {
  networks: [
    {
      name: 'optimism-goerli',
      chainId: 420,
      transport: http(process.env.PONDER_RPC_URL_420)
    },
    // {
    //   name: 'arbitrum-goerli',
    //   chainId: 421613,
    //   transport: http(process.env.PONDER_RPC_URL_421613),
    // },
    // {
    //   name: 'anvil',
    //   chainId: 31337,
    //   transport: http(process.env.ANVIL_FORK_URL),
    // },
  ],
  contracts: [
    {
      name: 'PostGateway',
      abi: postGatewayABI,
      network: 'optimism-goerli',
      address: addresses.postGateway.opGoerli,
      startBlock: 16774340,
    },
    // {
    //   name: 'PostGateway',
    //   abi: postGatewayABI,
    //   network: 'anvil',
    //   address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
    //   startBlock: 0,
    // },
    {
      name: 'IdRegistry',
      abi: idRegistryABI,
      network: 'optimism-goerli',
      address: addresses.idRegistry.opGoerli,
      startBlock: 16474518,
    },
    // {
    //   name: 'IdRegistry',
    //   abi: idRegistryABI,
    //   network: 'anvil',
    //   address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    //   startBlock: 0,
    // },
    // {
    //   name: 'DelegateRegistry',
    //   abi: delegateRegistryABI,
    //   network: 'optimism-goerli',
    //   address: addresses.delegateRegistry.opGoerli,
    //   startBlock: 16474518,
    // },
    // {
    //   name: 'DelegateRegistry',
    //   abi: delegateRegistryABI,
    //   network: 'anvil',
    //   address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    //   startBlock: 0,
    // },
    // {
    //   name: 'RiverValidatorV1',
    //   abi: riverValidatorV1ABI,
    //   network: 'optimism-goerli',
    //   address: addresses.riverValidatorV1.opGoerli,
    //   startBlock: 16474518,
    // },
    // {
    //   name: 'RiverValidatorV1',
    //   abi: riverValidatorV1ABI,
    //   network: 'anvil',
    //   address: '0x',
    //   startBlock: 0,
    // },
    // {
    //   name: 'LightAccountFactory',
    //   abi: lightAccountFactoryABI,
    //   network: 'optimism-goerli',
    //   address: addresses.lightAccountFactory.opGoerli,
    //   startBlock: 16474518,
    // },
  ],
}
