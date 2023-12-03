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

export type Channel = {
  __typename?: 'Channel'
  admins: Array<Scalars['BigInt']['output']>
  creatorId?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['BigInt']['output']
  items: Array<Item>
  members?: Maybe<Array<Maybe<Scalars['BigInt']['output']>>>
  timestamp?: Maybe<Scalars['BigInt']['output']>
  uri?: Maybe<Scalars['String']['output']>
}

export type ChannelItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

export type ChannelCounter = {
  __typename?: 'ChannelCounter'
  counter?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['String']['output']
  timestamp?: Maybe<Scalars['BigInt']['output']>
}

export type ChannelCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>
  counter_not?: InputMaybe<Scalars['BigInt']['input']>
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type ChannelFilter = {
  admins?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  admins_has?: InputMaybe<Scalars['BigInt']['input']>
  admins_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  admins_not_has?: InputMaybe<Scalars['BigInt']['input']>
  creatorId?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_gt?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_gte?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  creatorId_lt?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_lte?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_not?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id?: InputMaybe<Scalars['BigInt']['input']>
  id_gt?: InputMaybe<Scalars['BigInt']['input']>
  id_gte?: InputMaybe<Scalars['BigInt']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id_lt?: InputMaybe<Scalars['BigInt']['input']>
  id_lte?: InputMaybe<Scalars['BigInt']['input']>
  id_not?: InputMaybe<Scalars['BigInt']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  members?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  members_has?: InputMaybe<Scalars['BigInt']['input']>
  members_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  members_not_has?: InputMaybe<Scalars['BigInt']['input']>
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  channel?: Maybe<Channel>
  creatorId?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['BigInt']['output']
  target?: Maybe<Target>
  timestamp?: Maybe<Scalars['BigInt']['output']>
  type?: Maybe<TargetType>
}

export type ItemCounter = {
  __typename?: 'ItemCounter'
  counter?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['String']['output']
  timestamp?: Maybe<Scalars['BigInt']['output']>
}

export type ItemCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>
  counter_not?: InputMaybe<Scalars['BigInt']['input']>
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type ItemFilter = {
  channel?: InputMaybe<Scalars['BigInt']['input']>
  channel_gt?: InputMaybe<Scalars['BigInt']['input']>
  channel_gte?: InputMaybe<Scalars['BigInt']['input']>
  channel_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  channel_lt?: InputMaybe<Scalars['BigInt']['input']>
  channel_lte?: InputMaybe<Scalars['BigInt']['input']>
  channel_not?: InputMaybe<Scalars['BigInt']['input']>
  channel_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  creatorId?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_gt?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_gte?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  creatorId_lt?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_lte?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_not?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id?: InputMaybe<Scalars['BigInt']['input']>
  id_gt?: InputMaybe<Scalars['BigInt']['input']>
  id_gte?: InputMaybe<Scalars['BigInt']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id_lt?: InputMaybe<Scalars['BigInt']['input']>
  id_lte?: InputMaybe<Scalars['BigInt']['input']>
  id_not?: InputMaybe<Scalars['BigInt']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  target?: InputMaybe<Scalars['BigInt']['input']>
  target_gt?: InputMaybe<Scalars['BigInt']['input']>
  target_gte?: InputMaybe<Scalars['BigInt']['input']>
  target_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  target_lt?: InputMaybe<Scalars['BigInt']['input']>
  target_lte?: InputMaybe<Scalars['BigInt']['input']>
  target_not?: InputMaybe<Scalars['BigInt']['input']>
  target_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  type?: InputMaybe<TargetType>
  type_in?: InputMaybe<Array<InputMaybe<TargetType>>>
  type_not?: InputMaybe<TargetType>
  type_not_in?: InputMaybe<Array<InputMaybe<TargetType>>>
}

export type Message = {
  __typename?: 'Message'
  id: Scalars['String']['output']
  msgBody?: Maybe<Scalars['String']['output']>
  msgType?: Maybe<Scalars['BigInt']['output']>
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
}

export type Nft = {
  __typename?: 'Nft'
  chainId: Scalars['BigInt']['output']
  hasId: Scalars['Boolean']['output']
  id: Scalars['String']['output']
  targetContract: Scalars['String']['output']
  tokenId: Scalars['BigInt']['output']
}

export type NftFilter = {
  chainId?: InputMaybe<Scalars['BigInt']['input']>
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  targetContract?: InputMaybe<Scalars['String']['input']>
  targetContract_contains?: InputMaybe<Scalars['String']['input']>
  targetContract_ends_with?: InputMaybe<Scalars['String']['input']>
  targetContract_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  targetContract_not?: InputMaybe<Scalars['String']['input']>
  targetContract_not_contains?: InputMaybe<Scalars['String']['input']>
  targetContract_not_ends_with?: InputMaybe<Scalars['String']['input']>
  targetContract_not_in?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>>
  >
  targetContract_not_starts_with?: InputMaybe<Scalars['String']['input']>
  targetContract_starts_with?: InputMaybe<Scalars['String']['input']>
  tokenId?: InputMaybe<Scalars['BigInt']['input']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Post = {
  __typename?: 'Post'
  expiration?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['String']['output']
  messageArray?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  post?: Maybe<Scalars['String']['output']>
  relayer?: Maybe<Scalars['String']['output']>
  sig?: Maybe<Scalars['String']['output']>
  sigType?: Maybe<Scalars['BigInt']['output']>
  timestamp?: Maybe<Scalars['BigInt']['output']>
  userId?: Maybe<Scalars['BigInt']['output']>
  version?: Maybe<Scalars['BigInt']['output']>
}

export type PostCounter = {
  __typename?: 'PostCounter'
  counter?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['String']['output']
  timestamp?: Maybe<Scalars['BigInt']['output']>
}

export type PostCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>
  counter_not?: InputMaybe<Scalars['BigInt']['input']>
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type PostFilter = {
  expiration?: InputMaybe<Scalars['BigInt']['input']>
  expiration_gt?: InputMaybe<Scalars['BigInt']['input']>
  expiration_gte?: InputMaybe<Scalars['BigInt']['input']>
  expiration_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  expiration_lt?: InputMaybe<Scalars['BigInt']['input']>
  expiration_lte?: InputMaybe<Scalars['BigInt']['input']>
  expiration_not?: InputMaybe<Scalars['BigInt']['input']>
  expiration_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  messageArray?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  messageArray_has?: InputMaybe<Scalars['String']['input']>
  messageArray_not?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  messageArray_not_has?: InputMaybe<Scalars['String']['input']>
  post?: InputMaybe<Scalars['String']['input']>
  post_contains?: InputMaybe<Scalars['String']['input']>
  post_ends_with?: InputMaybe<Scalars['String']['input']>
  post_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  post_not?: InputMaybe<Scalars['String']['input']>
  post_not_contains?: InputMaybe<Scalars['String']['input']>
  post_not_ends_with?: InputMaybe<Scalars['String']['input']>
  post_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  post_not_starts_with?: InputMaybe<Scalars['String']['input']>
  post_starts_with?: InputMaybe<Scalars['String']['input']>
  relayer?: InputMaybe<Scalars['String']['input']>
  relayer_contains?: InputMaybe<Scalars['String']['input']>
  relayer_ends_with?: InputMaybe<Scalars['String']['input']>
  relayer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  relayer_not?: InputMaybe<Scalars['String']['input']>
  relayer_not_contains?: InputMaybe<Scalars['String']['input']>
  relayer_not_ends_with?: InputMaybe<Scalars['String']['input']>
  relayer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  relayer_not_starts_with?: InputMaybe<Scalars['String']['input']>
  relayer_starts_with?: InputMaybe<Scalars['String']['input']>
  sig?: InputMaybe<Scalars['String']['input']>
  sigType?: InputMaybe<Scalars['BigInt']['input']>
  sigType_gt?: InputMaybe<Scalars['BigInt']['input']>
  sigType_gte?: InputMaybe<Scalars['BigInt']['input']>
  sigType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  sigType_lt?: InputMaybe<Scalars['BigInt']['input']>
  sigType_lte?: InputMaybe<Scalars['BigInt']['input']>
  sigType_not?: InputMaybe<Scalars['BigInt']['input']>
  sigType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  sig_contains?: InputMaybe<Scalars['String']['input']>
  sig_ends_with?: InputMaybe<Scalars['String']['input']>
  sig_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sig_not?: InputMaybe<Scalars['String']['input']>
  sig_not_contains?: InputMaybe<Scalars['String']['input']>
  sig_not_ends_with?: InputMaybe<Scalars['String']['input']>
  sig_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  sig_not_starts_with?: InputMaybe<Scalars['String']['input']>
  sig_starts_with?: InputMaybe<Scalars['String']['input']>
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId?: InputMaybe<Scalars['BigInt']['input']>
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>
  userId_not?: InputMaybe<Scalars['BigInt']['input']>
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  version?: InputMaybe<Scalars['BigInt']['input']>
  version_gt?: InputMaybe<Scalars['BigInt']['input']>
  version_gte?: InputMaybe<Scalars['BigInt']['input']>
  version_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  version_lt?: InputMaybe<Scalars['BigInt']['input']>
  version_lte?: InputMaybe<Scalars['BigInt']['input']>
  version_not?: InputMaybe<Scalars['BigInt']['input']>
  version_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type Publication = {
  __typename?: 'Publication'
  creatorId?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['BigInt']['output']
  timestamp?: Maybe<Scalars['BigInt']['output']>
  uri?: Maybe<Scalars['String']['output']>
}

export type PublicationCounter = {
  __typename?: 'PublicationCounter'
  counter?: Maybe<Scalars['BigInt']['output']>
  id: Scalars['String']['output']
  timestamp?: Maybe<Scalars['BigInt']['output']>
}

export type PublicationCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>
  counter_not?: InputMaybe<Scalars['BigInt']['input']>
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
}

export type PublicationFilter = {
  creatorId?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_gt?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_gte?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  creatorId_lt?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_lte?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_not?: InputMaybe<Scalars['BigInt']['input']>
  creatorId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id?: InputMaybe<Scalars['BigInt']['input']>
  id_gt?: InputMaybe<Scalars['BigInt']['input']>
  id_gte?: InputMaybe<Scalars['BigInt']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id_lt?: InputMaybe<Scalars['BigInt']['input']>
  id_lte?: InputMaybe<Scalars['BigInt']['input']>
  id_not?: InputMaybe<Scalars['BigInt']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
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
  channel?: Maybe<Channel>
  channelCounter?: Maybe<ChannelCounter>
  channelCounters: Array<ChannelCounter>
  channels: Array<Channel>
  idRegistry?: Maybe<IdRegistry>
  idRegistrys: Array<IdRegistry>
  item?: Maybe<Item>
  itemCounter?: Maybe<ItemCounter>
  itemCounters: Array<ItemCounter>
  items: Array<Item>
  message?: Maybe<Message>
  messages: Array<Message>
  nft?: Maybe<Nft>
  nfts: Array<Nft>
  post?: Maybe<Post>
  postCounter?: Maybe<PostCounter>
  postCounters: Array<PostCounter>
  posts: Array<Post>
  publication?: Maybe<Publication>
  publicationCounter?: Maybe<PublicationCounter>
  publicationCounters: Array<PublicationCounter>
  publications: Array<Publication>
  target?: Maybe<Target>
  targets: Array<Target>
  url?: Maybe<Url>
  urls: Array<Url>
}

/** Autogenerated file. Do not edit manually. */
export type QueryChannelArgs = {
  id: Scalars['BigInt']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryChannelCounterArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryChannelCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ChannelCounterFilter>
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
  id: Scalars['BigInt']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryItemCounterArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryItemCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<ItemCounterFilter>
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
export type QueryNftArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryNftsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<NftFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPostArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPostCounterArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPostCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PostCounterFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPostsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PostFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPublicationArgs = {
  id: Scalars['BigInt']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPublicationCounterArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryPublicationCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<PublicationCounterFilter>
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
export type QueryTargetArgs = {
  id: Scalars['BigInt']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryTargetsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<TargetFilter>
}

/** Autogenerated file. Do not edit manually. */
export type QueryUrlArgs = {
  id: Scalars['String']['input']
  timestamp?: InputMaybe<Scalars['Int']['input']>
}

/** Autogenerated file. Do not edit manually. */
export type QueryUrlsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
  orderBy?: InputMaybe<Scalars['String']['input']>
  orderDirection?: InputMaybe<Scalars['String']['input']>
  skip?: InputMaybe<Scalars['Int']['input']>
  timestamp?: InputMaybe<Scalars['Int']['input']>
  where?: InputMaybe<UrlFilter>
}

export type Target = {
  __typename?: 'Target'
  id: Scalars['BigInt']['output']
  nft?: Maybe<Nft>
  publication?: Maybe<Publication>
  type: TargetType
  url?: Maybe<Url>
}

export type TargetFilter = {
  id?: InputMaybe<Scalars['BigInt']['input']>
  id_gt?: InputMaybe<Scalars['BigInt']['input']>
  id_gte?: InputMaybe<Scalars['BigInt']['input']>
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  id_lt?: InputMaybe<Scalars['BigInt']['input']>
  id_lte?: InputMaybe<Scalars['BigInt']['input']>
  id_not?: InputMaybe<Scalars['BigInt']['input']>
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  nft?: InputMaybe<Scalars['String']['input']>
  nft_contains?: InputMaybe<Scalars['String']['input']>
  nft_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  nft_not?: InputMaybe<Scalars['String']['input']>
  nft_not_contains?: InputMaybe<Scalars['String']['input']>
  nft_not_ends_with?: InputMaybe<Scalars['String']['input']>
  nft_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  nft_not_starts_with?: InputMaybe<Scalars['String']['input']>
  nft_starts_with?: InputMaybe<Scalars['String']['input']>
  publication?: InputMaybe<Scalars['BigInt']['input']>
  publication_gt?: InputMaybe<Scalars['BigInt']['input']>
  publication_gte?: InputMaybe<Scalars['BigInt']['input']>
  publication_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  publication_lt?: InputMaybe<Scalars['BigInt']['input']>
  publication_lte?: InputMaybe<Scalars['BigInt']['input']>
  publication_not?: InputMaybe<Scalars['BigInt']['input']>
  publication_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>
  type?: InputMaybe<TargetType>
  type_in?: InputMaybe<Array<InputMaybe<TargetType>>>
  type_not?: InputMaybe<TargetType>
  type_not_in?: InputMaybe<Array<InputMaybe<TargetType>>>
  url?: InputMaybe<Scalars['String']['input']>
  url_contains?: InputMaybe<Scalars['String']['input']>
  url_ends_with?: InputMaybe<Scalars['String']['input']>
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  url_not?: InputMaybe<Scalars['String']['input']>
  url_not_contains?: InputMaybe<Scalars['String']['input']>
  url_not_ends_with?: InputMaybe<Scalars['String']['input']>
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  url_not_starts_with?: InputMaybe<Scalars['String']['input']>
  url_starts_with?: InputMaybe<Scalars['String']['input']>
}

export enum TargetType {
  Nft = 'NFT',
  Pub = 'PUB',
  Url = 'URL',
}

export type Url = {
  __typename?: 'Url'
  id: Scalars['String']['output']
  url?: Maybe<Scalars['String']['output']>
}

export type UrlFilter = {
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
  url?: InputMaybe<Scalars['String']['input']>
  url_contains?: InputMaybe<Scalars['String']['input']>
  url_ends_with?: InputMaybe<Scalars['String']['input']>
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  url_not?: InputMaybe<Scalars['String']['input']>
  url_not_contains?: InputMaybe<Scalars['String']['input']>
  url_not_ends_with?: InputMaybe<Scalars['String']['input']>
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  url_not_starts_with?: InputMaybe<Scalars['String']['input']>
  url_starts_with?: InputMaybe<Scalars['String']['input']>
}

export type AllChannelsQueryVariables = Exact<{ [key: string]: never }>

export type AllChannelsQuery = {
  __typename?: 'Query'
  channels: Array<{
    __typename?: 'Channel'
    creatorId?: any | null
    admins: Array<any>
    id: any
    members?: Array<any | null> | null
    timestamp?: any | null
    uri?: string | null
    items: Array<{
      __typename?: 'Item'
      creatorId?: any | null
      id: any
      type?: TargetType | null
      timestamp?: any | null
      target?: {
        __typename?: 'Target'
        id: any
        type: TargetType
        publication?: {
          __typename?: 'Publication'
          creatorId?: any | null
          id: any
          timestamp?: any | null
          uri?: string | null
        } | null
      } | null
    }>
  }>
}

export type AllChannelsForIdQueryVariables = Exact<{
  creatorId?: InputMaybe<Scalars['BigInt']['input']>
}>

export type AllChannelsForIdQuery = {
  __typename?: 'Query'
  channels: Array<{
    __typename?: 'Channel'
    creatorId?: any | null
    admins: Array<any>
    id: any
    members?: Array<any | null> | null
    timestamp?: any | null
    uri?: string | null
    items: Array<{
      __typename?: 'Item'
      creatorId?: any | null
      id: any
      type?: TargetType | null
      timestamp?: any | null
      target?: {
        __typename?: 'Target'
        id: any
        type: TargetType
        publication?: {
          __typename?: 'Publication'
          creatorId?: any | null
          id: any
          timestamp?: any | null
          uri?: string | null
        } | null
      } | null
    }>
  }>
}

export type AllItemsQueryVariables = Exact<{ [key: string]: never }>

export type AllItemsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Item'
    creatorId?: any | null
    id: any
    type?: TargetType | null
    timestamp?: any | null
    target?: {
      __typename?: 'Target'
      id: any
      type: TargetType
      publication?: {
        __typename?: 'Publication'
        creatorId?: any | null
        id: any
        timestamp?: any | null
        uri?: string | null
      } | null
    } | null
  }>
}

export type AllItemsForIdQueryVariables = Exact<{
  creatorId?: InputMaybe<Scalars['BigInt']['input']>
}>

export type AllItemsForIdQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Item'
    creatorId?: any | null
    id: any
    type?: TargetType | null
    timestamp?: any | null
    target?: {
      __typename?: 'Target'
      id: any
      type: TargetType
      publication?: {
        __typename?: 'Publication'
        creatorId?: any | null
        id: any
        timestamp?: any | null
        uri?: string | null
      } | null
    } | null
  }>
}

export type ChannelWithIdQueryVariables = Exact<{
  id: Scalars['BigInt']['input']
}>

export type ChannelWithIdQuery = {
  __typename?: 'Query'
  channel?: {
    __typename?: 'Channel'
    id: any
    members?: Array<any | null> | null
    timestamp?: any | null
    uri?: string | null
    admins: Array<any>
    creatorId?: any | null
    items: Array<{
      __typename?: 'Item'
      creatorId?: any | null
      id: any
      type?: TargetType | null
      timestamp?: any | null
      target?: {
        __typename?: 'Target'
        id: any
        type: TargetType
        publication?: {
          __typename?: 'Publication'
          creatorId?: any | null
          id: any
          timestamp?: any | null
          uri?: string | null
        } | null
      } | null
    }>
  } | null
}

export type UserActivityQueryVariables = Exact<{
  creatorId?: InputMaybe<Scalars['BigInt']['input']>
}>

export type UserActivityQuery = {
  __typename?: 'Query'
  channels: Array<{
    __typename?: 'Channel'
    creatorId?: any | null
    admins: Array<any>
    id: any
    members?: Array<any | null> | null
    timestamp?: any | null
    uri?: string | null
    items: Array<{
      __typename?: 'Item'
      creatorId?: any | null
      id: any
      type?: TargetType | null
      timestamp?: any | null
      target?: {
        __typename?: 'Target'
        id: any
        type: TargetType
        publication?: {
          __typename?: 'Publication'
          creatorId?: any | null
          id: any
          timestamp?: any | null
          uri?: string | null
        } | null
      } | null
    }>
  }>
  items: Array<{
    __typename?: 'Item'
    creatorId?: any | null
    id: any
    type?: TargetType | null
    timestamp?: any | null
    target?: {
      __typename?: 'Target'
      id: any
      type: TargetType
      publication?: {
        __typename?: 'Publication'
        creatorId?: any | null
        id: any
        timestamp?: any | null
        uri?: string | null
      } | null
    } | null
  }>
}

export type UserIdQueryVariables = Exact<{
  custodyAddress: Scalars['String']['input']
}>

export type UserIdQuery = {
  __typename?: 'Query'
  idRegistrys: Array<{ __typename?: 'IdRegistry'; userId?: any | null }>
}

export const AllChannelsDocument = gql`
    query allChannels {
  channels(orderBy: "id", orderDirection: "desc") {
    creatorId
    admins
    id
    members
    timestamp
    uri
    items(orderBy: "timestamp", orderDirection: "desc") {
      creatorId
      id
      type
      timestamp
      target {
        id
        type
        publication {
          creatorId
          id
          timestamp
          uri
        }
      }
    }
  }
}
    `
export const AllChannelsForIdDocument = gql`
    query allChannelsForId($creatorId: BigInt) {
  channels(orderBy: "id", orderDirection: "desc", where: {creatorId: $creatorId}) {
    creatorId
    admins
    id
    members
    timestamp
    uri
    items(orderBy: "timestamp", orderDirection: "desc") {
      creatorId
      id
      type
      timestamp
      target {
        id
        type
        publication {
          creatorId
          id
          timestamp
          uri
        }
      }
    }
  }
}
    `
export const AllItemsDocument = gql`
    query allItems {
  items(orderBy: "id", orderDirection: "desc") {
    creatorId
    id
    type
    timestamp
    target {
      id
      type
      publication {
        creatorId
        id
        timestamp
        uri
      }
    }
  }
}
    `
export const AllItemsForIdDocument = gql`
    query allItemsForId($creatorId: BigInt) {
  items(
    orderBy: "timestamp"
    orderDirection: "desc"
    where: {creatorId: $creatorId}
  ) {
    creatorId
    id
    type
    timestamp
    target {
      id
      type
      publication {
        creatorId
        id
        timestamp
        uri
      }
    }
  }
}
    `
export const ChannelWithIdDocument = gql`
    query channelWithId($id: BigInt!) {
  channel(id: $id) {
    id
    members
    timestamp
    uri
    admins
    creatorId
    items(orderBy: "id", orderDirection: "desc") {
      creatorId
      id
      type
      timestamp
      target {
        id
        type
        publication {
          creatorId
          id
          timestamp
          uri
        }
      }
    }
  }
}
    `
export const UserActivityDocument = gql`
    query userActivity($creatorId: BigInt) {
  channels(orderBy: "id", orderDirection: "desc", where: {creatorId: $creatorId}) {
    creatorId
    admins
    id
    members
    timestamp
    uri
    items(orderBy: "id", orderDirection: "desc") {
      creatorId
      id
      type
      timestamp
      target {
        id
        type
        publication {
          creatorId
          id
          timestamp
          uri
        }
      }
    }
  }
  items(orderBy: "id", orderDirection: "desc", where: {creatorId: $creatorId}) {
    creatorId
    id
    type
    timestamp
    target {
      id
      type
      publication {
        creatorId
        id
        timestamp
        uri
      }
    }
  }
}
    `
export const UserIdDocument = gql`
    query UserId($custodyAddress: String!) {
  idRegistrys(where: {to: $custodyAddress}) {
    userId
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
    allChannelsForId(
      variables?: AllChannelsForIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AllChannelsForIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllChannelsForIdQuery>(
            AllChannelsForIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'allChannelsForId',
        'query',
      )
    },
    allItems(
      variables?: AllItemsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AllItemsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllItemsQuery>(AllItemsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'allItems',
        'query',
      )
    },
    allItemsForId(
      variables?: AllItemsForIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AllItemsForIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllItemsForIdQuery>(AllItemsForIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'allItemsForId',
        'query',
      )
    },
    channelWithId(
      variables: ChannelWithIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<ChannelWithIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ChannelWithIdQuery>(ChannelWithIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'channelWithId',
        'query',
      )
    },
    userActivity(
      variables?: UserActivityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserActivityQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserActivityQuery>(UserActivityDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userActivity',
        'query',
      )
    },
    UserId(
      variables: UserIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UserIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserIdQuery>(UserIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UserId',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
