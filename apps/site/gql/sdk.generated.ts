import type { DocumentNode } from "graphql/language/ast";
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String']['output'];
  items: Array<Item>;
  uri?: Maybe<Scalars['String']['output']>;
};


export type ChannelItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type ChannelFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type IdRegistry = {
  __typename?: 'IdRegistry';
  backup?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  to?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type IdRegistryFilter = {
  backup?: InputMaybe<Scalars['String']['input']>;
  backup_contains?: InputMaybe<Scalars['String']['input']>;
  backup_ends_with?: InputMaybe<Scalars['String']['input']>;
  backup_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  backup_not?: InputMaybe<Scalars['String']['input']>;
  backup_not_contains?: InputMaybe<Scalars['String']['input']>;
  backup_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  backup_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  backup_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  backup_starts_with?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Scalars['String']['input']>;
  data_contains?: InputMaybe<Scalars['String']['input']>;
  data_ends_with?: InputMaybe<Scalars['String']['input']>;
  data_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  data_not?: InputMaybe<Scalars['String']['input']>;
  data_not_contains?: InputMaybe<Scalars['String']['input']>;
  data_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  data_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  data_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  data_starts_with?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type Item = {
  __typename?: 'Item';
  chainId: Scalars['BigInt']['output'];
  channel?: Maybe<Channel>;
  hasId: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  target: Scalars['String']['output'];
  targetId: Scalars['BigInt']['output'];
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type ItemFilter = {
  chainId?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chainId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  channel?: InputMaybe<Scalars['String']['input']>;
  channel_contains?: InputMaybe<Scalars['String']['input']>;
  channel_ends_with?: InputMaybe<Scalars['String']['input']>;
  channel_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channel_not?: InputMaybe<Scalars['String']['input']>;
  channel_not_contains?: InputMaybe<Scalars['String']['input']>;
  channel_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  channel_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channel_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  channel_starts_with?: InputMaybe<Scalars['String']['input']>;
  hasId?: InputMaybe<Scalars['Boolean']['input']>;
  hasId_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  hasId_not?: InputMaybe<Scalars['Boolean']['input']>;
  hasId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['String']['input']>;
  targetId?: InputMaybe<Scalars['BigInt']['input']>;
  targetId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  targetId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  targetId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  targetId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  targetId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  targetId_not?: InputMaybe<Scalars['BigInt']['input']>;
  targetId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  target_contains?: InputMaybe<Scalars['String']['input']>;
  target_ends_with?: InputMaybe<Scalars['String']['input']>;
  target_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  target_not?: InputMaybe<Scalars['String']['input']>;
  target_not_contains?: InputMaybe<Scalars['String']['input']>;
  target_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  target_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  target_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  target_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String']['output'];
  msgBody?: Maybe<Scalars['String']['output']>;
  msgType?: Maybe<Scalars['BigInt']['output']>;
  node?: Maybe<Node>;
  nodeId?: Maybe<Scalars['BigInt']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['BigInt']['output']>;
};

export type MessageFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  msgBody?: InputMaybe<Scalars['String']['input']>;
  msgBody_contains?: InputMaybe<Scalars['String']['input']>;
  msgBody_ends_with?: InputMaybe<Scalars['String']['input']>;
  msgBody_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  msgBody_not?: InputMaybe<Scalars['String']['input']>;
  msgBody_not_contains?: InputMaybe<Scalars['String']['input']>;
  msgBody_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  msgBody_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  msgBody_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  msgBody_starts_with?: InputMaybe<Scalars['String']['input']>;
  msgType?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  msgType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_not?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  node?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  node_contains?: InputMaybe<Scalars['String']['input']>;
  node_ends_with?: InputMaybe<Scalars['String']['input']>;
  node_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  node_not?: InputMaybe<Scalars['String']['input']>;
  node_not_contains?: InputMaybe<Scalars['String']['input']>;
  node_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  node_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  node_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  node_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type Node = {
  __typename?: 'Node';
  id: Scalars['String']['output'];
  messages: Array<Message>;
  nodeAdmin: Array<Scalars['BigInt']['output']>;
  nodeId: Scalars['BigInt']['output'];
  nodeMembers: Array<Scalars['BigInt']['output']>;
  schema: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  userId: Scalars['BigInt']['output'];
};


export type NodeMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type NodeFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  nodeAdmin?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeAdmin_has?: InputMaybe<Scalars['BigInt']['input']>;
  nodeAdmin_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeAdmin_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_not?: InputMaybe<Scalars['BigInt']['input']>;
  nodeId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeMembers?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeMembers_has?: InputMaybe<Scalars['BigInt']['input']>;
  nodeMembers_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  nodeMembers_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
  schema_contains?: InputMaybe<Scalars['String']['input']>;
  schema_ends_with?: InputMaybe<Scalars['String']['input']>;
  schema_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  schema_not?: InputMaybe<Scalars['String']['input']>;
  schema_not_contains?: InputMaybe<Scalars['String']['input']>;
  schema_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  schema_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  schema_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  schema_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_not?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sender_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sender_starts_with?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type Publication = {
  __typename?: 'Publication';
  id: Scalars['String']['output'];
  uri: Scalars['String']['output'];
};

export type PublicationFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated file. Do not edit manually. */
export type Query = {
  __typename?: 'Query';
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  idRegistry?: Maybe<IdRegistry>;
  idRegistrys: Array<IdRegistry>;
  item?: Maybe<Item>;
  items: Array<Item>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  node?: Maybe<Node>;
  nodes: Array<Node>;
  publication?: Maybe<Publication>;
  publications: Array<Publication>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryChannelArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryChannelsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChannelFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryIdRegistryArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryIdRegistrysArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<IdRegistryFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryItemArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryMessageArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryNodeArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryNodesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NodeFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryPublicationArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryPublicationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PublicationFilter>;
};

export type AllChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllChannelsQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Node', nodeId: any, schema: string, messages: Array<{ __typename?: 'Message', msgBody?: string | null, msgType?: any | null, userId?: any | null, nodeId?: any | null }> }>, channels: Array<{ __typename?: 'Channel', id: string, uri?: string | null }> };

export type ChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelQuery = { __typename?: 'Query', channel?: { __typename?: 'Channel', id: string, uri?: string | null, items: Array<{ __typename?: 'Item', chainId: any, id: string, target: string, targetId: any }> } | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', hasId: boolean, id: string, targetId: any, userId?: any | null, target: string }> };

export type NodesQueryVariables = Exact<{ [key: string]: never; }>;


export type NodesQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Node', id: string, nodeId: any, userId: any, nodeMembers: Array<any>, schema: string, sender: string, messages: Array<{ __typename?: 'Message', msgBody?: string | null, msgType?: any | null, id: string, sender?: string | null }> }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', idRegistrys: Array<{ __typename?: 'IdRegistry', userId?: any | null }> };

export type UserPublicationsQueryVariables = Exact<{
  schema: Scalars['String']['input'];
  userId: Scalars['BigInt']['input'];
}>;


export type UserPublicationsQuery = { __typename?: 'Query', nodes: Array<{ __typename?: 'Node', id: string, nodeAdmin: Array<any>, nodeId: any, nodeMembers: Array<any>, schema: string, sender: string }> };


export const AllChannelsDocument = gql`
    query allChannels {
  nodes {
    nodeId
    schema
    messages {
      msgBody
      msgType
      userId
      nodeId
    }
  }
  channels {
    id
    uri
  }
}
    `;
export const ChannelDocument = gql`
    query Channel {
  channel(id: "") {
    id
    uri
    items(orderBy: "") {
      chainId
      id
      target
      targetId
    }
  }
}
    `;
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
    `;
export const NodesDocument = gql`
    query Nodes {
  nodes {
    id
    nodeId
    userId
    nodeMembers
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
    `;
export const GetUserDocument = gql`
    query getUser {
  idRegistrys(where: {to: ""}) {
    userId
  }
}
    `;
export const UserPublicationsDocument = gql`
    query UserPublications($schema: String!, $userId: BigInt!) {
  nodes(where: {schema: $schema, userId: $userId}) {
    id
    nodeAdmin
    nodeId
    nodeMembers
    schema
    sender
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    allChannels(variables?: AllChannelsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllChannelsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllChannelsQuery>(AllChannelsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allChannels', 'query');
    },
    Channel(variables?: ChannelQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelQuery>(ChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Channel', 'query');
    },
    items(variables?: ItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemsQuery>(ItemsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'items', 'query');
    },
    Nodes(variables?: NodesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NodesQuery>(NodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Nodes', 'query');
    },
    getUser(variables?: GetUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    },
    UserPublications(variables: UserPublicationsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserPublicationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserPublicationsQuery>(UserPublicationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserPublications', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;