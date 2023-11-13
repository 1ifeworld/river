import { messageIds } from "../constants";

export function isValidMessageId(messageId: bigint): boolean {
    return messageIds.has(messageId);
}
