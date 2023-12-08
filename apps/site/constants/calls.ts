import { type Hash, encodeFunctionData } from 'viem'
import { addresses } from 'scrypt'
import { idRegistryABI, delegateRegistryABI } from 'scrypt'

const zeroBytes: Hash = '0x'

export const register = {
  target: addresses.idRegistry.opGoerli,
  calldata: encodeFunctionData({
    abi: idRegistryABI,
    functionName: 'register',
    args: [addresses.operator.opGoerli, zeroBytes],
  }),
}

export const delegate = {
  target: addresses.delegateRegistry.opGoerli,
  calldata: encodeFunctionData({
    abi: delegateRegistryABI,
    functionName: 'updateDelegate',
    args: [addresses.operator.opGoerli, true],
  }),
}
