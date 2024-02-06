import { addresses } from "../../constants"
import {optimism} from "viem/chains"


export const ID_REGISTRY_EIP_712_DOMAIN = {
    name: 'River IdRegistry',
    version: '1',
    chainId: optimism.id,
    verifyingContract: addresses.idRegistry.optimism, 
  } as const
  
  export const REGISTER_TYPE = [
    { name: 'to', type: 'address' },
    { name: 'recovery', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
  ] as const
//   export const TYPED_DATA_STRUCT = {
//     account: embeddedWallet.address as Hex,
//     domain: ID_REGISTRY_EIP_712_DOMAIN,
//     types: { Register: REGISTER_TYPE },
//     primaryType: 'Register',
//     message: {
//       to: embeddedWallet.address as Hex,
//       recovery: addresses.riverRecovery.optimism,
//       nonce: BigInt(0), // assumes all wallets calling this have 0 previous transactions
//       deadline: deadline,
//     },
//   }  