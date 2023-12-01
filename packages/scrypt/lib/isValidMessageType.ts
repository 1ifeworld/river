import { messageTypesSet } from '../constants'

export function isValidMessageType(messageId: bigint): boolean {
  return messageTypesSet.has(messageId)
}
