import type { DocumentNode } from 'graphql/language/ast'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  BigInt: { input: any; output: any }
}

export type Call = {
  __typename?: 'Call'
  id: Scalars['String']['output']
  msgBody: Scalars['String']['output']
  msgType: Scalars['BigInt']['output']
  nodeId: Scalars['BigInt']['output']
  schema: Scalars['String']['output']
  sender: Scalars['String']['output']
  userId: Scalars['BigInt']['output']
}

export type CallFilter = {
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  msgBody?: InputMaybe<Scalars['String']['input']>
  msgBody_contains?: InputMaybe<Scalars['String']['input']>
  msgBody_ends_with?: InputMaybe<Scalars['String']['input']>
  msgBody_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  msgBody_not?: InputMaybe<Scalars['String']['input']>
  msgBody_not_contains?: InputMaybe<Scalars['String']['input']>
  msgBody_not_ends_with?: InputMaybe<Scalars['String']['input']>
  msgBody_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  msgBody_not_starts_with?: InputMaybe<Scalars['String']['input']>
  msgBody_starts_with?: InputMaybe<Scalars['String']['input']>
  msgType?: InputMaybe<Scalars['BigInt']['input']>
  msgType_gt?: InputMaybe<Scalars['BigInt']['input']>
  msgType_gte?: InputMaybe<Scalars['BigInt']['input']>
  msgType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  msgType_lt?: InputMaybe<Scalars['BigInt']['input']>
  msgType_lte?: InputMaybe<Scalars['BigInt']['input']>
  msgType_not?: InputMaybe<Scalars['BigInt']['input']>
  msgType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  schema?: InputMaybe<Scalars['String']['input']>
  schema_contains?: InputMaybe<Scalars['String']['input']>
  schema_ends_with?: InputMaybe<Scalars['String']['input']>
  schema_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  schema_not?: InputMaybe<Scalars['String']['input']>
  schema_not_contains?: InputMaybe<Scalars['String']['input']>
  schema_not_ends_with?: InputMaybe<Scalars['String']['input']>
  schema_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  schema_not_starts_with?: InputMaybe<Scalars['String']['input']>
  schema_starts_with?: InputMaybe<Scalars['String']['input']>
  sender?: InputMaybe<Scalars['String']['input']>
  sender_contains?: InputMaybe<Scalars['String']['input']>
  sender_ends_with?: InputMaybe<Scalars['String']['input']>
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sender_not?: InputMaybe<Scalars['String']['input']>
  sender_not_contains?: InputMaybe<Scalars['String']['input']>
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>
  sender_starts_with?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Channel = {
  __typename?: 'Channel'
  id: Scalars['String']['output']
  items: Array<Item>
}

export type ChannelItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

export type ChannelFilter = {
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
}

export type DelegateRegistry = {
  __typename?: 'DelegateRegistry'
  id: Scalars['String']['output']
  status: Scalars['Boolean']['output']
  target: Scalars['String']['output']
  transferNonce: Scalars['BigInt']['output']
  userId: Scalars['BigInt']['output']
}

export type DelegateRegistryFilter = {
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['Boolean']['input']>
  status_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  status_not?: InputMaybe<Scalars['Boolean']['input']>
  status_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  target?: InputMaybe<Scalars['String']['input']>
  target_contains?: InputMaybe<Scalars['String']['input']>
  target_ends_with?: InputMaybe<Scalars['String']['input']>
  target_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  target_not?: InputMaybe<Scalars['String']['input']>
  target_not_contains?: InputMaybe<Scalars['String']['input']>
  target_not_ends_with?: InputMaybe<Scalars['String']['input']>
  target_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  target_not_starts_with?: InputMaybe<Scalars['String']['input']>
  target_starts_with?: InputMaybe<Scalars['String']['input']>
  transferNonce?: InputMaybe<Scalars['BigInt']['input']>
  transferNonce_gt?: InputMaybe<Scalars['BigInt']['input']>
  transferNonce_gte?: InputMaybe<Scalars['BigInt']['input']>
  transferNonce_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  transferNonce_lt?: InputMaybe<Scalars['BigInt']['input']>
  transferNonce_lte?: InputMaybe<Scalars['BigInt']['input']>
  transferNonce_not?: InputMaybe<Scalars['BigInt']['input']>
  transferNonce_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['BigInt']['input']>>
  >
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type IdRegistry = {
  __typename?: 'IdRegistry'
  attestor?: Maybe<Scalars['String']['output']>
  backup?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  from?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  to?: Maybe<Scalars['String']['output']>
  userId?: Maybe<Scalars['BigInt']['output']>
}

export type IdRegistryFilter = {
  attestor?: InputMaybe<Scalars['String']['input']>
  attestor_contains?: InputMaybe<Scalars['String']['input']>
  attestor_ends_with?: InputMaybe<Scalars['String']['input']>
  attestor_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  attestor_not?: InputMaybe<Scalars['String']['input']>
  attestor_not_contains?: InputMaybe<Scalars['String']['input']>
  attestor_not_ends_with?: InputMaybe<Scalars['String']['input']>
  attestor_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  attestor_not_starts_with?: InputMaybe<Scalars['String']['input']>
  attestor_starts_with?: InputMaybe<Scalars['String']['input']>
  backup?: InputMaybe<Scalars['String']['input']>
  backup_contains?: InputMaybe<Scalars['String']['input']>
  backup_ends_with?: InputMaybe<Scalars['String']['input']>
  backup_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  backup_not?: InputMaybe<Scalars['String']['input']>
  backup_not_contains?: InputMaybe<Scalars['String']['input']>
  backup_not_ends_with?: InputMaybe<Scalars['String']['input']>
  backup_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  backup_not_starts_with?: InputMaybe<Scalars['String']['input']>
  backup_starts_with?: InputMaybe<Scalars['String']['input']>
  data?: InputMaybe<Scalars['String']['input']>
  data_contains?: InputMaybe<Scalars['String']['input']>
  data_ends_with?: InputMaybe<Scalars['String']['input']>
  data_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  data_not?: InputMaybe<Scalars['String']['input']>
  data_not_contains?: InputMaybe<Scalars['String']['input']>
  data_not_ends_with?: InputMaybe<Scalars['String']['input']>
  data_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  data_not_starts_with?: InputMaybe<Scalars['String']['input']>
  data_starts_with?: InputMaybe<Scalars['String']['input']>
  from?: InputMaybe<Scalars['String']['input']>
  from_contains?: InputMaybe<Scalars['String']['input']>
  from_ends_with?: InputMaybe<Scalars['String']['input']>
  from_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  from_not?: InputMaybe<Scalars['String']['input']>
  from_not_contains?: InputMaybe<Scalars['String']['input']>
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>
  from_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>
  from_starts_with?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  to?: InputMaybe<Scalars['String']['input']>
  to_contains?: InputMaybe<Scalars['String']['input']>
  to_ends_with?: InputMaybe<Scalars['String']['input']>
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  to_not?: InputMaybe<Scalars['String']['input']>
  to_not_contains?: InputMaybe<Scalars['String']['input']>
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>
  to_starts_with?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Item = {
  __typename?: 'Item'
  chainId: Scalars['BigInt']['output']
  channel?: Maybe<Channel>
  hasId: Scalars['Boolean']['output']
  id: Scalars['String']['output']
  target: Scalars['String']['output']
  targetId: Scalars['BigInt']['output']
}

export type ItemFilter = {
  chainId?: InputMaybe<Scalars['BigInt']['input']>
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  channel?: InputMaybe<Scalars['String']['input']>
  channel_contains?: InputMaybe<Scalars['String']['input']>
  channel_ends_with?: InputMaybe<Scalars['String']['input']>
  channel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  channel_not?: InputMaybe<Scalars['String']['input']>
  channel_not_contains?: InputMaybe<Scalars['String']['input']>
  channel_not_ends_with?: InputMaybe<Scalars['String']['input']>
  channel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  channel_not_starts_with?: InputMaybe<Scalars['String']['input']>
  channel_starts_with?: InputMaybe<Scalars['String']['input']>
  hasId?: InputMaybe<Scalars['Boolean']['input']>
  hasId_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  hasId_not?: InputMaybe<Scalars['Boolean']['input']>
  hasId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  target?: InputMaybe<Scalars['String']['input']>
  targetId?: InputMaybe<Scalars['BigInt']['input']>
  targetId_gt?: InputMaybe<Scalars['BigInt']['input']>
  targetId_gte?: InputMaybe<Scalars['BigInt']['input']>
  targetId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  targetId_lt?: InputMaybe<Scalars['BigInt']['input']>
  targetId_lte?: InputMaybe<Scalars['BigInt']['input']>
  targetId_not?: InputMaybe<Scalars['BigInt']['input']>
  targetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  target_contains?: InputMaybe<Scalars['String']['input']>
  target_ends_with?: InputMaybe<Scalars['String']['input']>
  target_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  target_not?: InputMaybe<Scalars['String']['input']>
  target_not_contains?: InputMaybe<Scalars['String']['input']>
  target_not_ends_with?: InputMaybe<Scalars['String']['input']>
  target_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  target_not_starts_with?: InputMaybe<Scalars['String']['input']>
  target_starts_with?: InputMaybe<Scalars['String']['input']>
}

export type Node = {
  __typename?: 'Node'
  id: Scalars['String']['output']
  msgBody: Scalars['String']['output']
  msgType: Scalars['BigInt']['output']
  nodeAdmin: Scalars['BigInt']['output']
  nodeId: Scalars['BigInt']['output']
  nodeMembers: Array<Maybe<Scalars['BigInt']['output']>>
  schema: Scalars['String']['output']
  sender: Scalars['String']['output']
  userId: Scalars['BigInt']['output']
}

export type NodeFilter = {
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  msgBody?: InputMaybe<Scalars['String']['input']>
  msgBody_contains?: InputMaybe<Scalars['String']['input']>
  msgBody_ends_with?: InputMaybe<Scalars['String']['input']>
  msgBody_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  msgBody_not?: InputMaybe<Scalars['String']['input']>
  msgBody_not_contains?: InputMaybe<Scalars['String']['input']>
  msgBody_not_ends_with?: InputMaybe<Scalars['String']['input']>
  msgBody_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  msgBody_not_starts_with?: InputMaybe<Scalars['String']['input']>
  msgBody_starts_with?: InputMaybe<Scalars['String']['input']>
  msgType?: InputMaybe<Scalars['BigInt']['input']>
  msgType_gt?: InputMaybe<Scalars['BigInt']['input']>
  msgType_gte?: InputMaybe<Scalars['BigInt']['input']>
  msgType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  msgType_lt?: InputMaybe<Scalars['BigInt']['input']>
  msgType_lte?: InputMaybe<Scalars['BigInt']['input']>
  msgType_not?: InputMaybe<Scalars['BigInt']['input']>
  msgType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeAdmin?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_gt?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_gte?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeAdmin_lt?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_lte?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_not?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeMembers?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeMembers_has?: InputMaybe<Scalars['BigInt']['input']>
  nodeMembers_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeMembers_not_has?: InputMaybe<Scalars['BigInt']['input']>
  schema?: InputMaybe<Scalars['String']['input']>
  schema_contains?: InputMaybe<Scalars['String']['input']>
  schema_ends_with?: InputMaybe<Scalars['String']['input']>
  schema_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  schema_not?: InputMaybe<Scalars['String']['input']>
  schema_not_contains?: InputMaybe<Scalars['String']['input']>
  schema_not_ends_with?: InputMaybe<Scalars['String']['input']>
  schema_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  schema_not_starts_with?: InputMaybe<Scalars['String']['input']>
  schema_starts_with?: InputMaybe<Scalars['String']['input']>
  sender?: InputMaybe<Scalars['String']['input']>
  sender_contains?: InputMaybe<Scalars['String']['input']>
  sender_ends_with?: InputMaybe<Scalars['String']['input']>
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sender_not?: InputMaybe<Scalars['String']['input']>
  sender_not_contains?: InputMaybe<Scalars['String']['input']>
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>
  sender_starts_with?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Publication = {
  __typename?: 'Publication'
  id: Scalars['String']['output']
  uri: Scalars['String']['output']
}

export type PublicationFilter = {
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  uri?: InputMaybe<Scalars['String']['input']>
  uri_contains?: InputMaybe<Scalars['String']['input']>
  uri_ends_with?: InputMaybe<Scalars['String']['input']>
  uri_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  uri_not?: InputMaybe<Scalars['String']['input']>
  uri_not_contains?: InputMaybe<Scalars['String']['input']>
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>
  uri_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>
  uri_starts_with?: InputMaybe<Scalars['String']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type Query = {
  __typename?: 'Query'
  call?: Maybe<Call>
  calls: Array<Call>
  channel?: Maybe<Channel>
  channels: Array<Channel>
  delegateRegistry?: Maybe<DelegateRegistry>
  delegateRegistrys: Array<DelegateRegistry>
  idRegistry?: Maybe<IdRegistry>
  idRegistrys: Array<IdRegistry>
  item?: Maybe<Item>
  items: Array<Item>
  node?: Maybe<Node>
  nodes: Array<Node>
  publication?: Maybe<Publication>
  publications: Array<Publication>
  riverValidatorV1?: Maybe<RiverValidatorV1>
  riverValidatorV1s: Array<RiverValidatorV1>
  schema?: Maybe<Schema>
  schemas: Array<Schema>
}

/** Autogenerated file. Do not edit manually. */
export type QueryCallArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryCallsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<CallFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryChannelArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryChannelsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ChannelFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryDelegateRegistryArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryDelegateRegistrysArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<DelegateRegistryFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryIdRegistryArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryIdRegistrysArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<IdRegistryFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryItemArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ItemFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryNodeArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryNodesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<NodeFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPublicationArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPublicationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PublicationFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryRiverValidatorV1Args = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryRiverValidatorV1sArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<RiverValidatorV1Filter>
}

/** Autogenerated file. Do not edit manually. */
export type QuerySchemaArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QuerySchemasArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<SchemaFilter>
}

export type RiverValidatorV1 = {
  __typename?: 'RiverValidatorV1'
  id: Scalars['String']['output']
  operator?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['Boolean']['output']>
  userId?: Maybe<Scalars['BigInt']['output']>
}

export type RiverValidatorV1Filter = {
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  operator?: InputMaybe<Scalars['String']['input']>
  operator_contains?: InputMaybe<Scalars['String']['input']>
  operator_ends_with?: InputMaybe<Scalars['String']['input']>
  operator_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  operator_not?: InputMaybe<Scalars['String']['input']>
  operator_not_contains?: InputMaybe<Scalars['String']['input']>
  operator_not_ends_with?: InputMaybe<Scalars['String']['input']>
  operator_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  operator_not_starts_with?: InputMaybe<Scalars['String']['input']>
  operator_starts_with?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['Boolean']['input']>
  status_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  status_not?: InputMaybe<Scalars['Boolean']['input']>
  status_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Schema = {
  __typename?: 'Schema'
  data?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  schema: Scalars['String']['output']
  sender: Scalars['String']['output']
}

export type SchemaFilter = {
  data?: InputMaybe<Scalars['String']['input']>
  data_contains?: InputMaybe<Scalars['String']['input']>
  data_ends_with?: InputMaybe<Scalars['String']['input']>
  data_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  data_not?: InputMaybe<Scalars['String']['input']>
  data_not_contains?: InputMaybe<Scalars['String']['input']>
  data_not_ends_with?: InputMaybe<Scalars['String']['input']>
  data_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  data_not_starts_with?: InputMaybe<Scalars['String']['input']>
  data_starts_with?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  id_contains?: InputMaybe<Scalars['String']['input']>
  id_ends_with?: InputMaybe<Scalars['String']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not?: InputMaybe<Scalars['String']['input']>
  id_not_contains?: InputMaybe<Scalars['String']['input']>
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>
  id_starts_with?: InputMaybe<Scalars['String']['input']>
  schema?: InputMaybe<Scalars['String']['input']>
  schema_contains?: InputMaybe<Scalars['String']['input']>
  schema_ends_with?: InputMaybe<Scalars['String']['input']>
  schema_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  schema_not?: InputMaybe<Scalars['String']['input']>
  schema_not_contains?: InputMaybe<Scalars['String']['input']>
  schema_not_ends_with?: InputMaybe<Scalars['String']['input']>
  schema_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  schema_not_starts_with?: InputMaybe<Scalars['String']['input']>
  schema_starts_with?: InputMaybe<Scalars['String']['input']>
  sender?: InputMaybe<Scalars['String']['input']>
  sender_contains?: InputMaybe<Scalars['String']['input']>
  sender_ends_with?: InputMaybe<Scalars['String']['input']>
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sender_not?: InputMaybe<Scalars['String']['input']>
  sender_not_contains?: InputMaybe<Scalars['String']['input']>
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>
  sender_starts_with?: InputMaybe<Scalars['String']['input']>
}

export type NodesQueryVariables = Exact<{
  schema: Scalars['String']['input']
}>

export type NodesQuery = {
  __typename?: 'Query'
  nodes: Array<{
    __typename?: 'Node'
    id: string
    msgBody: string
    msgType: any
    nodeAdmin: any
    nodeId: any
    nodeMembers: Array<any | null>
    schema: string
    sender: string
    userId: any
  }>
}

export type UserPublicationsQueryVariables = Exact<{
  schema: Scalars['String']['input']
  userId: Scalars['BigInt']['input']
}>

export type UserPublicationsQuery = {
  __typename?: 'Query'
  nodes: Array<{
    __typename?: 'Node'
    id: string
    msgBody: string
    msgType: any
    nodeAdmin: any
    nodeId: any
    nodeMembers: Array<any | null>
    schema: string
    sender: string
  }>
}

export const NodesDocument = gql`
    query Nodes($schema: String!) {
  nodes(where: {schema: $schema}) {
    id
    msgBody
    msgType
    nodeAdmin
    nodeId
    nodeMembers
    schema
    sender
    userId
  }
}
    `
export const UserPublicationsDocument = gql`
    query UserPublications($schema: String!, $userId: BigInt!) {
  nodes(where: {schema: $schema, userId: $userId}) {
    id
    msgBody
    msgType
    nodeAdmin
    nodeId
    nodeMembers
    schema
    sender
  }
}
    `

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    Nodes(
      variables: NodesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<NodesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<NodesQuery>(NodesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Nodes',
        'query',
      )
    },
    UserPublications(
      variables: UserPublicationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserPublicationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserPublicationsQuery>(
            UserPublicationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UserPublications',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
