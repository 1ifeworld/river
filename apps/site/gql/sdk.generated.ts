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
  admins: Array<Scalars['BigInt']['output']>;
  createdBy: Scalars['BigInt']['output'];
  createdTimestamp: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  members: Array<Scalars['BigInt']['output']>;
  references: Array<Reference>;
  uri: Scalars['String']['output'];
};


export type ChannelReferencesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type ChannelCounter = {
  __typename?: 'ChannelCounter';
  counter: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
};

export type ChannelCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type ChannelFilter = {
  admins?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  admins_has?: InputMaybe<Scalars['BigInt']['input']>;
  admins_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  admins_not_has?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  members?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  members_has?: InputMaybe<Scalars['BigInt']['input']>;
  members_not?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  members_not_has?: InputMaybe<Scalars['BigInt']['input']>;
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

export type Message = {
  __typename?: 'Message';
  id: Scalars['String']['output'];
  msgBody: Scalars['String']['output'];
  msgType: Scalars['BigInt']['output'];
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
};

export type Post = {
  __typename?: 'Post';
  data: Scalars['String']['output'];
  expiration: Scalars['BigInt']['output'];
  hash: Scalars['String']['output'];
  hashType: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  messageArray: Array<Scalars['String']['output']>;
  relayer: Scalars['String']['output'];
  sig: Scalars['String']['output'];
  sigType: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
  userId: Scalars['BigInt']['output'];
  version: Scalars['BigInt']['output'];
};

export type PostCounter = {
  __typename?: 'PostCounter';
  counter: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
};

export type PostCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type PostFilter = {
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
  expiration?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  expiration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_not?: InputMaybe<Scalars['BigInt']['input']>;
  expiration_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  hash?: InputMaybe<Scalars['String']['input']>;
  hashType?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  hashType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_not?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  hash_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  messageArray?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageArray_has?: InputMaybe<Scalars['String']['input']>;
  messageArray_not?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageArray_not_has?: InputMaybe<Scalars['String']['input']>;
  relayer?: InputMaybe<Scalars['String']['input']>;
  relayer_contains?: InputMaybe<Scalars['String']['input']>;
  relayer_ends_with?: InputMaybe<Scalars['String']['input']>;
  relayer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  relayer_not?: InputMaybe<Scalars['String']['input']>;
  relayer_not_contains?: InputMaybe<Scalars['String']['input']>;
  relayer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  relayer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  relayer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  relayer_starts_with?: InputMaybe<Scalars['String']['input']>;
  sig?: InputMaybe<Scalars['String']['input']>;
  sigType?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sigType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_not?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sig_contains?: InputMaybe<Scalars['String']['input']>;
  sig_ends_with?: InputMaybe<Scalars['String']['input']>;
  sig_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sig_not?: InputMaybe<Scalars['String']['input']>;
  sig_not_contains?: InputMaybe<Scalars['String']['input']>;
  sig_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  sig_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sig_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  sig_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  version?: InputMaybe<Scalars['BigInt']['input']>;
  version_gt?: InputMaybe<Scalars['BigInt']['input']>;
  version_gte?: InputMaybe<Scalars['BigInt']['input']>;
  version_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  version_lt?: InputMaybe<Scalars['BigInt']['input']>;
  version_lte?: InputMaybe<Scalars['BigInt']['input']>;
  version_not?: InputMaybe<Scalars['BigInt']['input']>;
  version_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type Publication = {
  __typename?: 'Publication';
  createdBy: Scalars['BigInt']['output'];
  createdTimestamp: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
};

export type PublicationCounter = {
  __typename?: 'PublicationCounter';
  counter: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
};

export type PublicationCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type PublicationFilter = {
  createdBy?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type Query = {
  __typename?: 'Query';
  channel?: Maybe<Channel>;
  channelCounter?: Maybe<ChannelCounter>;
  channelCounters: Array<ChannelCounter>;
  channels: Array<Channel>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  post?: Maybe<Post>;
  postCounter?: Maybe<PostCounter>;
  postCounters: Array<PostCounter>;
  posts: Array<Post>;
  publication?: Maybe<Publication>;
  publicationCounter?: Maybe<PublicationCounter>;
  publicationCounters: Array<PublicationCounter>;
  publications: Array<Publication>;
  reference?: Maybe<Reference>;
  referenceCounter?: Maybe<ReferenceCounter>;
  referenceCounters: Array<ReferenceCounter>;
  references: Array<Reference>;
  txn?: Maybe<Txn>;
  txns: Array<Txn>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryChannelArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChannelCounterFilter>;
};


export type QueryChannelsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChannelFilter>;
};


export type QueryMessageArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageFilter>;
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostCounterFilter>;
};


export type QueryPostsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFilter>;
};


export type QueryPublicationArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPublicationCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPublicationCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PublicationCounterFilter>;
};


export type QueryPublicationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PublicationFilter>;
};


export type QueryReferenceArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReferenceCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReferenceCountersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReferenceCounterFilter>;
};


export type QueryReferencesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReferenceFilter>;
};


export type QueryTxnArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTxnsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TxnFilter>;
};


export type QueryUserArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilter>;
};

export type Reference = {
  __typename?: 'Reference';
  chanRef?: Maybe<Channel>;
  chanRefId?: Maybe<Scalars['BigInt']['output']>;
  channel?: Maybe<Channel>;
  channelId?: Maybe<Scalars['BigInt']['output']>;
  createdBy: Scalars['BigInt']['output'];
  createdTimestamp: Scalars['BigInt']['output'];
  id: Scalars['BigInt']['output'];
  pubRef?: Maybe<Publication>;
  pubRefId?: Maybe<Scalars['BigInt']['output']>;
};

export type ReferenceCounter = {
  __typename?: 'ReferenceCounter';
  counter: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
};

export type ReferenceCounterFilter = {
  counter?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  counter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  counter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not?: InputMaybe<Scalars['BigInt']['input']>;
  counter_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type ReferenceFilter = {
  chanRefId?: InputMaybe<Scalars['BigInt']['input']>;
  chanRefId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  chanRefId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  chanRefId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  chanRefId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  chanRefId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  chanRefId_not?: InputMaybe<Scalars['BigInt']['input']>;
  chanRefId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  channelId?: InputMaybe<Scalars['BigInt']['input']>;
  channelId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  channelId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  channelId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  channelId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  channelId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  channelId_not?: InputMaybe<Scalars['BigInt']['input']>;
  channelId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  pubRefId?: InputMaybe<Scalars['BigInt']['input']>;
  pubRefId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pubRefId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pubRefId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  pubRefId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pubRefId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pubRefId_not?: InputMaybe<Scalars['BigInt']['input']>;
  pubRefId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type Txn = {
  __typename?: 'Txn';
  id: Scalars['String']['output'];
};

export type TxnFilter = {
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
};

export type User = {
  __typename?: 'User';
  backup: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  userId: Scalars['BigInt']['output'];
};

export type UserFilter = {
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
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type AllChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: any, createdTimestamp: any, createdBy: any, uri: string, admins: Array<any>, members: Array<any>, references: Array<{ __typename?: 'Reference', id: any, createdTimestamp: any, createdBy: any, channelId?: any | null, pubRefId?: any | null, pubRef?: { __typename?: 'Publication', id: any, createdTimestamp: any, createdBy: any, uri: string } | null }> }> };

export type ChannelWithIdQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type ChannelWithIdQuery = { __typename?: 'Query', channel?: { __typename?: 'Channel', id: any, createdTimestamp: any, createdBy: any, uri: string, admins: Array<any>, members: Array<any>, references: Array<{ __typename?: 'Reference', id: any, createdTimestamp: any, createdBy: any, pubRef?: { __typename?: 'Publication', id: any, createdTimestamp: any, createdBy: any, uri: string } | null }> } | null };

export type ReferenceWithIdQueryVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type ReferenceWithIdQuery = { __typename?: 'Query', reference?: { __typename?: 'Reference', id: any, createdTimestamp: any, createdBy: any, channelId?: any | null, pubRef?: { __typename?: 'Publication', id: any, createdTimestamp: any, createdBy: any, uri: string } | null } | null };

export type TxnHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type TxnHashQuery = { __typename?: 'Query', txn?: { __typename?: 'Txn', id: string } | null };

export type UserIdQueryVariables = Exact<{
  custodyAddress: Scalars['String']['input'];
}>;


export type UserIdQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', userId: any }> };


export const AllChannelsDocument = gql`
    query allChannels {
  channels(orderBy: "id", orderDirection: "desc") {
    id
    createdTimestamp
    createdBy
    uri
    admins
    members
    references(orderBy: "id", orderDirection: "desc") {
      id
      createdTimestamp
      createdBy
      channelId
      pubRefId
      pubRef {
        id
        createdTimestamp
        createdBy
        uri
      }
    }
  }
}
    `;
export const ChannelWithIdDocument = gql`
    query channelWithId($id: BigInt!) {
  channel(id: $id) {
    id
    createdTimestamp
    createdBy
    uri
    admins
    members
    references(orderBy: "id", orderDirection: "desc") {
      id
      createdTimestamp
      createdBy
      pubRef {
        id
        createdTimestamp
        createdBy
        uri
      }
    }
  }
}
    `;
export const ReferenceWithIdDocument = gql`
    query referenceWithId($id: BigInt!) {
  reference(id: $id) {
    id
    createdTimestamp
    createdBy
    channelId
    pubRef {
      id
      createdTimestamp
      createdBy
      uri
    }
  }
}
    `;
export const TxnHashDocument = gql`
    query txnHash($hash: String!) {
  txn(id: $hash) {
    id
  }
}
    `;
export const UserIdDocument = gql`
    query UserId($custodyAddress: String!) {
  users(where: {to: $custodyAddress}) {
    userId
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
    channelWithId(variables: ChannelWithIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelWithIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelWithIdQuery>(ChannelWithIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channelWithId', 'query');
    },
    referenceWithId(variables: ReferenceWithIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ReferenceWithIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReferenceWithIdQuery>(ReferenceWithIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'referenceWithId', 'query');
    },
    txnHash(variables: TxnHashQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TxnHashQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TxnHashQuery>(TxnHashDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'txnHash', 'query');
    },
    UserId(variables: UserIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserIdQuery>(UserIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserId', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;