import type { Hash, Hex } from 'viem'

export type Message = {
  rid: bigint
  timestamp: bigint
  msgType: number
  msgBody: Hash
}

export type Post = {
  signer: Hex
  message: Message
  hashType: number
  hash: Hash
  sigType: number
  sig: Hash
}

export const ChannelDataTypes = {
  NONE: 0,
  NAME_AND_DESC: 1,
} as const

export const ChannelAccessTypes = {
  NONE: 0,
  ROLES: 1,
} as const

export const ItemDataTypes = {
  NONE: 0,
  STRING_URI: 1,
} as const

export const ItemAccessTypes = {
  NONE: 0,
  ROLES: 1,
} as const

export const MessageTypes = {
  NONE: 0,
  CREATE_ITEM: 1,
  UPDATE_ITEM: 2,
  CREATE_CHANNEL: 3,
  UPDATE_CHANNEL: 4,
  ADD_ITEM_TO_CHANNEL: 5,
  REMOVE_ITEM_FROM_CHANNEL: 6,
} as const

export const ChannelRoleTypes = {
  NONE: 0,
  MEMBER: 1,
  ADMIN: 2,
} as const