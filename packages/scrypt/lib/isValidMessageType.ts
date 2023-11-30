import { messageTypes } from '../constants'

export function isValidMessageType(messageId: bigint): boolean {
  return messageTypes.has(messageId)
}
