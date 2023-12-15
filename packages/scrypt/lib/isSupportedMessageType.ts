import { messageTypeSet } from '../constants'

export function isSupportedMessageType(messageId: bigint): boolean {
  return messageTypeSet.has(messageId)
}