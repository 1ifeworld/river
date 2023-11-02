import { operator } from '../../constants'
import { Hash, Hex } from 'viem'

export function isValidNodeRegistration({
  sender,
  nodeId,
  data,
}: {
  sender: Hex
  nodeId: bigint
  data: Hash
}) {
  // check if function was called by operator
  if (sender != operator) return false
  return true
}
