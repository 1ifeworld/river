import { type Hex, type Hash, encodeFunctionData } from 'viem'
import { operator, idRegistry, delegateRegistry } from '@/constants'
import { idRegistryAbi, delegateRegistryAbi } from '@/abi'

const zeroBytes: Hash = '0x'

export const register = {
  target: idRegistry,
  calldata: encodeFunctionData({
    abi: idRegistryAbi,
    functionName: 'register',
    args: [operator.address, zeroBytes],
  }),
}

export const delegate = {
  target: delegateRegistry,
  calldata: encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: 'updateDelegate',
    args: [operator.address, true],
  }),
}
