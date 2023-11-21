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

export type AccessControl = {
  __typename?: 'AccessControl'
  id: Scalars['String']['output']
  nodeAdmin: Array<Scalars['BigInt']['output']>
  nodeId: Scalars['BigInt']['output']
  nodeMembers: Array<Scalars['BigInt']['output']>
}

export type AccessControlFilter = {
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
  nodeAdmin?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeAdmin_has?: InputMaybe<Scalars['BigInt']['input']>
  nodeAdmin_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeAdmin_not_has?: InputMaybe<Scalars['BigInt']['input']>
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
}

export type Channel = {
  __typename?: 'Channel'
  accessControl?: Maybe<AccessControl>
  createdAt?: Maybe<Scalars['BigInt']['output']>
  createdByID?: Maybe<Scalars['BigInt']['output']>
  hashId: Scalars['String']['output']
  id: Scalars['String']['output']
  items: Array<Item>
  nodeId?: Maybe<Scalars['BigInt']['output']>
  uri?: Maybe<Metadata>
}

export type ChannelItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

export type ChannelFilter = {
  accessControl?: InputMaybe<Scalars['String']['input']>
  accessControl_contains?: InputMaybe<Scalars['String']['input']>
  accessControl_ends_with?: InputMaybe<Scalars['String']['input']>
  accessControl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  accessControl_not?: InputMaybe<Scalars['String']['input']>
  accessControl_not_contains?: InputMaybe<Scalars['String']['input']>
  accessControl_not_ends_with?: InputMaybe<Scalars['String']['input']>
  accessControl_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >
  accessControl_not_starts_with?: InputMaybe<Scalars['String']['input']>
  accessControl_starts_with?: InputMaybe<Scalars['String']['input']>
  createdAt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdByID?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_gt?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_gte?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdByID_lt?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_lte?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_not?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  hashId?: InputMaybe<Scalars['String']['input']>
  hashId_contains?: InputMaybe<Scalars['String']['input']>
  hashId_ends_with?: InputMaybe<Scalars['String']['input']>
  hashId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hashId_not?: InputMaybe<Scalars['String']['input']>
  hashId_not_contains?: InputMaybe<Scalars['String']['input']>
  hashId_not_ends_with?: InputMaybe<Scalars['String']['input']>
  hashId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  hashId_not_starts_with?: InputMaybe<Scalars['String']['input']>
  hashId_starts_with?: InputMaybe<Scalars['String']['input']>
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
  nodeId?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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

export type IdRegistry = {
  __typename?: 'IdRegistry'
  backup?: Maybe<Scalars['String']['output']>
  data?: Maybe<Scalars['String']['output']>
  from?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  to?: Maybe<Scalars['String']['output']>
  userId?: Maybe<Scalars['BigInt']['output']>
}

export type IdRegistryFilter = {
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
  createdAt?: Maybe<Scalars['BigInt']['output']>
  hasId: Scalars['Boolean']['output']
  id: Scalars['String']['output']
  target: Scalars['String']['output']
  targetId: Scalars['BigInt']['output']
  targetMetadata?: Maybe<Metadata>
  userId?: Maybe<Scalars['BigInt']['output']>
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
  createdAt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  targetMetadata?: InputMaybe<Scalars['String']['input']>
  targetMetadata_contains?: InputMaybe<Scalars['String']['input']>
  targetMetadata_ends_with?: InputMaybe<Scalars['String']['input']>
  targetMetadata_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  targetMetadata_not?: InputMaybe<Scalars['String']['input']>
  targetMetadata_not_contains?: InputMaybe<Scalars['String']['input']>
  targetMetadata_not_ends_with?: InputMaybe<Scalars['String']['input']>
  targetMetadata_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >
  targetMetadata_not_starts_with?: InputMaybe<Scalars['String']['input']>
  targetMetadata_starts_with?: InputMaybe<Scalars['String']['input']>
  target_contains?: InputMaybe<Scalars['String']['input']>
  target_ends_with?: InputMaybe<Scalars['String']['input']>
  target_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  target_not?: InputMaybe<Scalars['String']['input']>
  target_not_contains?: InputMaybe<Scalars['String']['input']>
  target_not_ends_with?: InputMaybe<Scalars['String']['input']>
  target_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  target_not_starts_with?: InputMaybe<Scalars['String']['input']>
  target_starts_with?: InputMaybe<Scalars['String']['input']>
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Message = {
  __typename?: 'Message'
  id: Scalars['String']['output']
  msgBody?: Maybe<Scalars['String']['output']>
  msgType?: Maybe<Scalars['BigInt']['output']>
  node?: Maybe<Node>
  nodeId?: Maybe<Scalars['BigInt']['output']>
  sender?: Maybe<Scalars['String']['output']>
  userId?: Maybe<Scalars['BigInt']['output']>
}

export type MessageFilter = {
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
  node?: InputMaybe<Scalars['String']['input']>
  nodeId?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  node_contains?: InputMaybe<Scalars['String']['input']>
  node_ends_with?: InputMaybe<Scalars['String']['input']>
  node_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  node_not?: InputMaybe<Scalars['String']['input']>
  node_not_contains?: InputMaybe<Scalars['String']['input']>
  node_not_ends_with?: InputMaybe<Scalars['String']['input']>
  node_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  node_not_starts_with?: InputMaybe<Scalars['String']['input']>
  node_starts_with?: InputMaybe<Scalars['String']['input']>
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

export type Metadata = {
  __typename?: 'Metadata'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  imageUri?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

export type MetadataFilter = {
  description?: InputMaybe<Scalars['String']['input']>
  description_contains?: InputMaybe<Scalars['String']['input']>
  description_ends_with?: InputMaybe<Scalars['String']['input']>
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  description_not?: InputMaybe<Scalars['String']['input']>
  description_not_contains?: InputMaybe<Scalars['String']['input']>
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>
  description_starts_with?: InputMaybe<Scalars['String']['input']>
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
  imageUri?: InputMaybe<Scalars['String']['input']>
  imageUri_contains?: InputMaybe<Scalars['String']['input']>
  imageUri_ends_with?: InputMaybe<Scalars['String']['input']>
  imageUri_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  imageUri_not?: InputMaybe<Scalars['String']['input']>
  imageUri_not_contains?: InputMaybe<Scalars['String']['input']>
  imageUri_not_ends_with?: InputMaybe<Scalars['String']['input']>
  imageUri_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  imageUri_not_starts_with?: InputMaybe<Scalars['String']['input']>
  imageUri_starts_with?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  name_contains?: InputMaybe<Scalars['String']['input']>
  name_ends_with?: InputMaybe<Scalars['String']['input']>
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name_not?: InputMaybe<Scalars['String']['input']>
  name_not_contains?: InputMaybe<Scalars['String']['input']>
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>
  name_starts_with?: InputMaybe<Scalars['String']['input']>
}

export type Node = {
  __typename?: 'Node'
  AccessControl?: Maybe<AccessControl>
  id: Scalars['String']['output']
  messages: Array<Message>
  nodeId: Scalars['BigInt']['output']
  schema: Scalars['String']['output']
  sender: Scalars['String']['output']
  userId: Scalars['BigInt']['output']
}

export type NodeMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

export type NodeFilter = {
  AccessControl?: InputMaybe<Scalars['String']['input']>
  AccessControl_contains?: InputMaybe<Scalars['String']['input']>
  AccessControl_ends_with?: InputMaybe<Scalars['String']['input']>
  AccessControl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  AccessControl_not?: InputMaybe<Scalars['String']['input']>
  AccessControl_not_contains?: InputMaybe<Scalars['String']['input']>
  AccessControl_not_ends_with?: InputMaybe<Scalars['String']['input']>
  AccessControl_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >
  AccessControl_not_starts_with?: InputMaybe<Scalars['String']['input']>
  AccessControl_starts_with?: InputMaybe<Scalars['String']['input']>
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

export type Publication = {
  __typename?: 'Publication'
  createdAt?: Maybe<Scalars['BigInt']['output']>
  createdByID?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['String']['output']
  nodeId?: Maybe<Scalars['BigInt']['output']>
  uri?: Maybe<Metadata>
}

export type PublicationFilter = {
  createdAt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdByID?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_gt?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_gte?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  createdByID_lt?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_lte?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_not?: InputMaybe<Scalars['BigInt']['input']>
  createdByID_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  nodeId?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  accessControl?: Maybe<AccessControl>
  accessControls: Array<AccessControl>
  channel?: Maybe<Channel>
  channels: Array<Channel>
  idRegistry?: Maybe<IdRegistry>
  idRegistrys: Array<IdRegistry>
  item?: Maybe<Item>
  items: Array<Item>
  message?: Maybe<Message>
  messages: Array<Message>
  metadata?: Maybe<Metadata>
  metadatas: Array<Metadata>
  node?: Maybe<Node>
  nodes: Array<Node>
  publication?: Maybe<Publication>
  publications: Array<Publication>
}

/** Autogenerated file. Do not edit manually. */
export type QueryAccessControlArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryAccessControlsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<AccessControlFilter>
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
export type QueryMessageArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<MessageFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryMetadataArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryMetadatasArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<MetadataFilter>
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

export type AllChannelsQueryVariables = Exact<{ [key: string]: never }>

export type AllChannelsQuery = {
  __typename?: 'Query'
  channels: Array<{
    __typename?: 'Channel'
    hashId: string
    id: string
    createdAt?: any | null
    createdByID?: any | null
    nodeId?: any | null
    uri?: {
      __typename?: 'Metadata'
      id: string
      imageUri?: string | null
      description?: string | null
      name?: string | null
    } | null
    items: Array<{
      __typename?: 'Item'
      chainId: any
      id: string
      target: string
      targetId: any
      userId?: any | null
      hasId: boolean
      createdAt?: any | null
    }>
  }>
}

export type ChannelQueryVariables = Exact<{ [key: string]: never }>

export type ChannelQuery = {
  __typename?: 'Query'
  channel?: {
    __typename?: 'Channel'
    id: string
    uri?: {
      __typename?: 'Metadata'
      id: string
      imageUri?: string | null
      description?: string | null
      name?: string | null
    } | null
    items: Array<{
      __typename?: 'Item'
      chainId: any
      id: string
      target: string
      targetId: any
    }>
  } | null
}

export type ChannelWithHashQueryVariables = Exact<{
  hashId: Scalars['String']['input']
}>

export type ChannelWithHashQuery = {
  __typename?: 'Query'
  channels: Array<{
    __typename?: 'Channel'
    hashId: string
    id: string
    nodeId?: any | null
    uri?: {
      __typename?: 'Metadata'
      id: string
      imageUri?: string | null
      description?: string | null
      name?: string | null
    } | null
    items: Array<{
      __typename?: 'Item'
      chainId: any
      id: string
      target: string
      targetId: any
      userId?: any | null
      hasId: boolean
      createdAt?: any | null
    }>
  }>
}

export type ItemsQueryVariables = Exact<{ [key: string]: never }>

export type ItemsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Item'
    hasId: boolean
    id: string
    targetId: any
    userId?: any | null
    target: string
  }>
}

export type NodesQueryVariables = Exact<{ [key: string]: never }>

export type NodesQuery = {
  __typename?: 'Query'
  nodes: Array<{
    __typename?: 'Node'
    id: string
    nodeId: any
    userId: any
    schema: string
    sender: string
    messages: Array<{
      __typename?: 'Message'
      msgBody?: string | null
      msgType?: any | null
      id: string
      sender?: string | null
    }>
  }>
}

export type GetUserIdQueryVariables = Exact<{ [key: string]: never }>

export type GetUserIdQuery = {
  __typename?: 'Query'
  idRegistrys: Array<{ __typename?: 'IdRegistry'; userId?: any | null }>
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
    nodeId: any
    schema: string
    sender: string
  }>
}

export const AllChannelsDocument = gql`
    query allChannels {
  channels(orderBy: "nodeId", orderDirection: "desc") {
    hashId
    id
    createdAt
    createdByID
    nodeId
    uri {
      id
      imageUri
      description
      name
    }
    items {
      chainId
      id
      target
      targetId
      userId
      hasId
      createdAt
    }
  }
}
    `
export const ChannelDocument = gql`
    query Channel {
  channel(id: "") {
    id
    uri {
      id
      imageUri
      description
      name
    }
    items(orderBy: "") {
      chainId
      id
      target
      targetId
    }
  }
}
    `
export const ChannelWithHashDocument = gql`
    query ChannelWithHash($hashId: String!) {
  channels(where: {hashId: $hashId}) {
    hashId
    id
    uri {
      id
      imageUri
      description
      name
    }
    nodeId
    items {
      chainId
      id
      target
      targetId
      userId
      hasId
      createdAt
    }
  }
}
    `
export const ItemsDocument = gql`
    query items {
  items {
    hasId
    id
    targetId
    userId
    target
  }
}
    `
export const NodesDocument = gql`
    query Nodes {
  nodes {
    id
    nodeId
    userId
    schema
    sender
    messages {
      msgBody
      msgType
      id
      sender
    }
  }
}
    `

export const GetUserIdDocument = gql`
    query getUserId {
  idRegistrys(where: {to: ""}) {
    userId
  }
}
    `
export const UserPublicationsDocument = gql`
    query UserPublications($schema: String!, $userId: BigInt!) {
  nodes(where: {schema: $schema, userId: $userId}) {
    id
    nodeId
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
    allChannels(
      variables?: AllChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AllChannelsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllChannelsQuery>(AllChannelsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'allChannels',
        'query',
      )
    },
    Channel(
      variables?: ChannelQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ChannelQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ChannelQuery>(ChannelDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Channel',
        'query',
      )
    },
    ChannelWithHash(
      variables: ChannelWithHashQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ChannelWithHashQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ChannelWithHashQuery>(
            ChannelWithHashDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'ChannelWithHash',
        'query',
      )
    },
    items(
      variables?: ItemsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ItemsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ItemsQuery>(ItemsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'items',
        'query',
      )
    },
    Nodes(
      variables?: NodesQueryVariables,
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
    getUserId(
      variables?: GetUserIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetUserIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserIdQuery>(GetUserIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getUserId',
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
