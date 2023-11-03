import { type Hex, type Hash, encodeFunctionData } from 'viem'
import { operatorAddress, idRegistry, delegateRegistry } from '@/constants'
import { idRegistryAbi, delegateRegistryAbi } from '@/abi'

const zeroBytes: Hash = '0x'

export const register = {
  target: idRegistry,
  calldata: encodeFunctionData({
    abi: idRegistryAbi,
    functionName: 'register',
    args: [operatorAddress, zeroBytes],
  }),
}

export const delegate = {
  target: delegateRegistry,
  calldata: encodeFunctionData({
    abi: delegateRegistryAbi,
    functionName: 'updateDelegate',
    args: [operatorAddress, true],
  }),
}
