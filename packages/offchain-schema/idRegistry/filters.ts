import { operator } from '../constants/addresses'
import { Hash, Hex } from 'viem'

export function isValidSchemaRegistration({
  sender,
  schema,
  data,
}: {
  sender: Hex
  schema: Hash
  data: Hash
}) {
  // check if function was called by operator
  if (sender != operator) return false
  return true
}
