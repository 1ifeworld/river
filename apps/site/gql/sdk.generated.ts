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

export type Adds = {
  __typename?: 'Adds';
  addedBy: User;
  addedById: Scalars['BigInt']['output'];
  channel: Channel;
  channelId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  item: Item;
  itemId: Scalars['String']['output'];
  message: Message;
  messageId: Scalars['String']['output'];
  removed?: Maybe<Scalars['Boolean']['output']>;
  removedById?: Maybe<Scalars['BigInt']['output']>;
  timestamp: Scalars['BigInt']['output'];
};

export type AddsFilter = {
  addedById?: InputMaybe<Scalars['BigInt']['input']>;
  addedById_gt?: InputMaybe<Scalars['BigInt']['input']>;
  addedById_gte?: InputMaybe<Scalars['BigInt']['input']>;
  addedById_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  addedById_lt?: InputMaybe<Scalars['BigInt']['input']>;
  addedById_lte?: InputMaybe<Scalars['BigInt']['input']>;
  addedById_not?: InputMaybe<Scalars['BigInt']['input']>;
  addedById_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  channelId?: InputMaybe<Scalars['String']['input']>;
  channelId_contains?: InputMaybe<Scalars['String']['input']>;
  channelId_ends_with?: InputMaybe<Scalars['String']['input']>;
  channelId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channelId_not?: InputMaybe<Scalars['String']['input']>;
  channelId_not_contains?: InputMaybe<Scalars['String']['input']>;
  channelId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  channelId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channelId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  channelId_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  itemId?: InputMaybe<Scalars['String']['input']>;
  itemId_contains?: InputMaybe<Scalars['String']['input']>;
  itemId_ends_with?: InputMaybe<Scalars['String']['input']>;
  itemId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  itemId_not?: InputMaybe<Scalars['String']['input']>;
  itemId_not_contains?: InputMaybe<Scalars['String']['input']>;
  itemId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  itemId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  itemId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  itemId_starts_with?: InputMaybe<Scalars['String']['input']>;
  messageId?: InputMaybe<Scalars['String']['input']>;
  messageId_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not?: InputMaybe<Scalars['String']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  messageId_starts_with?: InputMaybe<Scalars['String']['input']>;
  removed?: InputMaybe<Scalars['Boolean']['input']>;
  removedById?: InputMaybe<Scalars['BigInt']['input']>;
  removedById_gt?: InputMaybe<Scalars['BigInt']['input']>;
  removedById_gte?: InputMaybe<Scalars['BigInt']['input']>;
  removedById_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  removedById_lt?: InputMaybe<Scalars['BigInt']['input']>;
  removedById_lte?: InputMaybe<Scalars['BigInt']['input']>;
  removedById_not?: InputMaybe<Scalars['BigInt']['input']>;
  removedById_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  removed_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  removed_not?: InputMaybe<Scalars['Boolean']['input']>;
  removed_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type AddsPage = {
  __typename?: 'AddsPage';
  items?: Maybe<Array<Adds>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Channel = {
  __typename?: 'Channel';
  adds?: Maybe<AddsPage>;
  createdBy: User;
  createdById: Scalars['BigInt']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message: Message;
  messageId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  roles?: Maybe<ChannelRolesPage>;
  timestamp: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
};


export type ChannelAddsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type ChannelRolesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
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

export type ChannelCounterPage = {
  __typename?: 'ChannelCounterPage';
  items?: Maybe<Array<ChannelCounter>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ChannelFilter = {
  createdById?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdById_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  messageId?: InputMaybe<Scalars['String']['input']>;
  messageId_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not?: InputMaybe<Scalars['String']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  messageId_starts_with?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type ChannelPage = {
  __typename?: 'ChannelPage';
  items?: Maybe<Array<Channel>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ChannelRoles = {
  __typename?: 'ChannelRoles';
  channel: Channel;
  channelId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  rid: Scalars['BigInt']['output'];
  role: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type ChannelRolesFilter = {
  channelId?: InputMaybe<Scalars['String']['input']>;
  channelId_contains?: InputMaybe<Scalars['String']['input']>;
  channelId_ends_with?: InputMaybe<Scalars['String']['input']>;
  channelId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channelId_not?: InputMaybe<Scalars['String']['input']>;
  channelId_not_contains?: InputMaybe<Scalars['String']['input']>;
  channelId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  channelId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  channelId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  channelId_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  rid?: InputMaybe<Scalars['BigInt']['input']>;
  rid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rid_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rid_not?: InputMaybe<Scalars['BigInt']['input']>;
  rid_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  role?: InputMaybe<Scalars['BigInt']['input']>;
  role_gt?: InputMaybe<Scalars['BigInt']['input']>;
  role_gte?: InputMaybe<Scalars['BigInt']['input']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  role_lt?: InputMaybe<Scalars['BigInt']['input']>;
  role_lte?: InputMaybe<Scalars['BigInt']['input']>;
  role_not?: InputMaybe<Scalars['BigInt']['input']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type ChannelRolesPage = {
  __typename?: 'ChannelRolesPage';
  items?: Maybe<Array<ChannelRoles>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Item = {
  __typename?: 'Item';
  adds?: Maybe<AddsPage>;
  createdBy: User;
  createdById: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  message: Message;
  messageId: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  uri: Scalars['String']['output'];
};


export type ItemAddsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemCounter = {
  __typename?: 'ItemCounter';
  counter: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
};

export type ItemCounterFilter = {
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

export type ItemCounterPage = {
  __typename?: 'ItemCounterPage';
  items?: Maybe<Array<ItemCounter>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ItemFilter = {
  createdById?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdById_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdById_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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
  messageId?: InputMaybe<Scalars['String']['input']>;
  messageId_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not?: InputMaybe<Scalars['String']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  messageId_starts_with?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type ItemPage = {
  __typename?: 'ItemPage';
  items?: Maybe<Array<Item>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ItemRoles = {
  __typename?: 'ItemRoles';
  id: Scalars['String']['output'];
  item: Item;
  itemId: Scalars['String']['output'];
  rid: Scalars['BigInt']['output'];
  role: Scalars['BigInt']['output'];
};

export type ItemRolesFilter = {
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
  itemId?: InputMaybe<Scalars['String']['input']>;
  itemId_contains?: InputMaybe<Scalars['String']['input']>;
  itemId_ends_with?: InputMaybe<Scalars['String']['input']>;
  itemId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  itemId_not?: InputMaybe<Scalars['String']['input']>;
  itemId_not_contains?: InputMaybe<Scalars['String']['input']>;
  itemId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  itemId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  itemId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  itemId_starts_with?: InputMaybe<Scalars['String']['input']>;
  rid?: InputMaybe<Scalars['BigInt']['input']>;
  rid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rid_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rid_not?: InputMaybe<Scalars['BigInt']['input']>;
  rid_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  role?: InputMaybe<Scalars['BigInt']['input']>;
  role_gt?: InputMaybe<Scalars['BigInt']['input']>;
  role_gte?: InputMaybe<Scalars['BigInt']['input']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  role_lt?: InputMaybe<Scalars['BigInt']['input']>;
  role_lte?: InputMaybe<Scalars['BigInt']['input']>;
  role_not?: InputMaybe<Scalars['BigInt']['input']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type ItemRolesPage = {
  __typename?: 'ItemRolesPage';
  items?: Maybe<Array<ItemRoles>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String']['output'];
  msgBody: Scalars['String']['output'];
  msgType: Scalars['BigInt']['output'];
  parentPostId: Scalars['String']['output'];
  rid: Scalars['BigInt']['output'];
  timestamp: Scalars['BigInt']['output'];
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
  msgBody_gt?: InputMaybe<Scalars['String']['input']>;
  msgBody_gte?: InputMaybe<Scalars['String']['input']>;
  msgBody_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  msgBody_lt?: InputMaybe<Scalars['String']['input']>;
  msgBody_lte?: InputMaybe<Scalars['String']['input']>;
  msgBody_not?: InputMaybe<Scalars['String']['input']>;
  msgBody_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  msgType?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  msgType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_not?: InputMaybe<Scalars['BigInt']['input']>;
  msgType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  parentPostId?: InputMaybe<Scalars['String']['input']>;
  parentPostId_contains?: InputMaybe<Scalars['String']['input']>;
  parentPostId_ends_with?: InputMaybe<Scalars['String']['input']>;
  parentPostId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  parentPostId_not?: InputMaybe<Scalars['String']['input']>;
  parentPostId_not_contains?: InputMaybe<Scalars['String']['input']>;
  parentPostId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  parentPostId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  parentPostId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  parentPostId_starts_with?: InputMaybe<Scalars['String']['input']>;
  rid?: InputMaybe<Scalars['BigInt']['input']>;
  rid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rid_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  rid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rid_not?: InputMaybe<Scalars['BigInt']['input']>;
  rid_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type MessagePage = {
  __typename?: 'MessagePage';
  items?: Maybe<Array<Message>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Post = {
  __typename?: 'Post';
  hash: Scalars['String']['output'];
  hashType: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  message: Message;
  messageId: Scalars['String']['output'];
  relayer: Scalars['String']['output'];
  sig: Scalars['String']['output'];
  sigType: Scalars['BigInt']['output'];
  signer: Scalars['String']['output'];
};

export type PostFilter = {
  hash?: InputMaybe<Scalars['String']['input']>;
  hashType?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  hashType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_not?: InputMaybe<Scalars['BigInt']['input']>;
  hashType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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
  messageId?: InputMaybe<Scalars['String']['input']>;
  messageId_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not?: InputMaybe<Scalars['String']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  messageId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  messageId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  messageId_starts_with?: InputMaybe<Scalars['String']['input']>;
  relayer?: InputMaybe<Scalars['String']['input']>;
  relayer_gt?: InputMaybe<Scalars['String']['input']>;
  relayer_gte?: InputMaybe<Scalars['String']['input']>;
  relayer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  relayer_lt?: InputMaybe<Scalars['String']['input']>;
  relayer_lte?: InputMaybe<Scalars['String']['input']>;
  relayer_not?: InputMaybe<Scalars['String']['input']>;
  relayer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sig?: InputMaybe<Scalars['String']['input']>;
  sigType?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sigType_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_not?: InputMaybe<Scalars['BigInt']['input']>;
  sigType_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  sig_gt?: InputMaybe<Scalars['String']['input']>;
  sig_gte?: InputMaybe<Scalars['String']['input']>;
  sig_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sig_lt?: InputMaybe<Scalars['String']['input']>;
  sig_lte?: InputMaybe<Scalars['String']['input']>;
  sig_not?: InputMaybe<Scalars['String']['input']>;
  sig_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  signer?: InputMaybe<Scalars['String']['input']>;
  signer_gt?: InputMaybe<Scalars['String']['input']>;
  signer_gte?: InputMaybe<Scalars['String']['input']>;
  signer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  signer_lt?: InputMaybe<Scalars['String']['input']>;
  signer_lte?: InputMaybe<Scalars['String']['input']>;
  signer_not?: InputMaybe<Scalars['String']['input']>;
  signer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PostPage = {
  __typename?: 'PostPage';
  items?: Maybe<Array<Post>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Query = {
  __typename?: 'Query';
  adds?: Maybe<Adds>;
  addss?: Maybe<AddsPage>;
  channel?: Maybe<Channel>;
  channelCounter?: Maybe<ChannelCounter>;
  channelCounters?: Maybe<ChannelCounterPage>;
  channelRoles?: Maybe<ChannelRoles>;
  channelRoless?: Maybe<ChannelRolesPage>;
  channels?: Maybe<ChannelPage>;
  item?: Maybe<Item>;
  itemCounter?: Maybe<ItemCounter>;
  itemCounters?: Maybe<ItemCounterPage>;
  itemRoles?: Maybe<ItemRoles>;
  itemRoless?: Maybe<ItemRolesPage>;
  items?: Maybe<ItemPage>;
  message?: Maybe<Message>;
  messages?: Maybe<MessagePage>;
  post?: Maybe<Post>;
  posts?: Maybe<PostPage>;
  txn?: Maybe<Txn>;
  txns?: Maybe<TxnPage>;
  user?: Maybe<User>;
  userCounter?: Maybe<UserCounter>;
  userCounters?: Maybe<UserCounterPage>;
  users?: Maybe<UserPage>;
};


export type QueryAddsArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAddssArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AddsFilter>;
};


export type QueryChannelArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelCountersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChannelCounterFilter>;
};


export type QueryChannelRolesArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryChannelRolessArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChannelRolesFilter>;
};


export type QueryChannelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ChannelFilter>;
};


export type QueryItemArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemCountersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemCounterFilter>;
};


export type QueryItemRolesArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryItemRolessArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemRolesFilter>;
};


export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ItemFilter>;
};


export type QueryMessageArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMessagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageFilter>;
};


export type QueryPostArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostFilter>;
};


export type QueryTxnArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTxnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TxnFilter>;
};


export type QueryUserArgs = {
  id: Scalars['BigInt']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserCounterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserCountersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserCounterFilter>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserFilter>;
};

export type Txn = {
  __typename?: 'Txn';
  id: Scalars['String']['output'];
};

export type TxnFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TxnPage = {
  __typename?: 'TxnPage';
  items?: Maybe<Array<Txn>>;
  pageInfo?: Maybe<PageInfo>;
};

export type User = {
  __typename?: 'User';
  from: Scalars['String']['output'];
  id: Scalars['BigInt']['output'];
  recovery: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
  to: Scalars['String']['output'];
  userId: Scalars['BigInt']['output'];
};

export type UserCounter = {
  __typename?: 'UserCounter';
  counter: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['BigInt']['output'];
};

export type UserCounterFilter = {
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

export type UserCounterPage = {
  __typename?: 'UserCounterPage';
  items?: Maybe<Array<UserCounter>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserFilter = {
  from?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['BigInt']['input']>;
  id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  id_not?: InputMaybe<Scalars['BigInt']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  recovery?: InputMaybe<Scalars['String']['input']>;
  recovery_gt?: InputMaybe<Scalars['String']['input']>;
  recovery_gte?: InputMaybe<Scalars['String']['input']>;
  recovery_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  recovery_lt?: InputMaybe<Scalars['String']['input']>;
  recovery_lte?: InputMaybe<Scalars['String']['input']>;
  recovery_not?: InputMaybe<Scalars['String']['input']>;
  recovery_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  userId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  userId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not?: InputMaybe<Scalars['BigInt']['input']>;
  userId_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
};

export type UserPage = {
  __typename?: 'UserPage';
  items?: Maybe<Array<User>>;
  pageInfo?: Maybe<PageInfo>;
};

export type AllAddsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAddsQuery = { __typename?: 'Query', addss?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', addedById: any, removed?: boolean | null, channelId: string, item: { __typename?: 'Item', id: string, timestamp: any, createdById: any, uri: string }, channel: { __typename?: 'Channel', name: string, roles?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', timestamp: any, rid: any, role: any }> | null } | null, adds?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', itemId: string }> | null } | null } }> | null } | null };

export type AllChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllChannelsQuery = { __typename?: 'Query', channels?: { __typename?: 'ChannelPage', items?: Array<{ __typename?: 'Channel', id: string, timestamp: any, createdById: any, uri: string, name: string, description: string, roles?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', timestamp: any, rid: any, role: any }> | null } | null }> | null } | null };

export type AllChannelsWithRidQueryVariables = Exact<{
  rid: Scalars['BigInt']['input'];
}>;


export type AllChannelsWithRidQuery = { __typename?: 'Query', channelRoless?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', channel: { __typename?: 'Channel', id: string, timestamp: any, createdById: any, uri: string, name: string, description: string, roles?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', rid: any, role: any }> | null } | null, adds?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', timestamp: any, channelId: string, itemId: string, addedById: any, removed?: boolean | null, item: { __typename?: 'Item', id: string, uri: string, timestamp: any, createdById: any } }> | null } | null } }> | null } | null };

export type AllItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllItemsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemPage', items?: Array<{ __typename?: 'Item', id: string }> | null } | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserPage', items?: Array<{ __typename?: 'User', id: any }> | null } | null };

export type ChannelWithIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ChannelWithIdQuery = { __typename?: 'Query', channel?: { __typename?: 'Channel', id: string, timestamp: any, createdById: any, uri: string, name: string, description: string, roles?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', timestamp: any, rid: any, role: any }> | null } | null, adds?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', timestamp: any, channelId: string, itemId: string, addedById: any, removed?: boolean | null, item: { __typename?: 'Item', id: string, uri: string, timestamp: any, createdById: any }, channel: { __typename?: 'Channel', name: string, adds?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', itemId: string }> | null } | null } }> | null } | null } | null };

export type ChannelsForItemQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ChannelsForItemQuery = { __typename?: 'Query', addss?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', channel: { __typename?: 'Channel', id: string, timestamp: any, uri: string, name: string, roles?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', rid: any, role: any }> | null } | null, adds?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', timestamp: any, channelId: string, itemId: string, addedById: any, removed?: boolean | null, item: { __typename?: 'Item', id: string, uri: string, timestamp: any, createdById: any } }> | null } | null } }> | null } | null };

export type ChannelsItemsWithUserQueryVariables = Exact<{
  userId: Scalars['BigInt']['input'];
}>;


export type ChannelsItemsWithUserQuery = { __typename?: 'Query', channels?: { __typename?: 'ChannelPage', items?: Array<{ __typename?: 'Channel', id: string, name: string, description: string, createdById: any, roles?: { __typename?: 'ChannelRolesPage', items?: Array<{ __typename?: 'ChannelRoles', rid: any, role: any }> | null } | null, adds?: { __typename?: 'AddsPage', items?: Array<{ __typename?: 'Adds', timestamp: any, removed?: boolean | null, item: { __typename?: 'Item', uri: string } }> | null } | null }> | null } | null, items?: { __typename?: 'ItemPage', items?: Array<{ __typename?: 'Item', timestamp: any, uri: string }> | null } | null };

export type ItemPageQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ItemPageQuery = { __typename?: 'Query', adds?: { __typename?: 'Adds', addedById: any, timestamp: any, itemId: string, channelId: string, channel: { __typename?: 'Channel', name: string }, item: { __typename?: 'Item', uri: string, createdById: any } } | null };

export type ItemWithIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ItemWithIdQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: string, timestamp: any, createdById: any, uri: string } | null };

export type MarqueeDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MarqueeDataQuery = { __typename?: 'Query', userCounters?: { __typename?: 'UserCounterPage', items?: Array<{ __typename?: 'UserCounter', counter: any }> | null } | null, itemCounters?: { __typename?: 'ItemCounterPage', items?: Array<{ __typename?: 'ItemCounter', counter: any }> | null } | null, channelCounters?: { __typename?: 'ChannelCounterPage', items?: Array<{ __typename?: 'ChannelCounter', counter: any }> | null } | null };

export type TxnHashQueryVariables = Exact<{
  hash: Scalars['String']['input'];
}>;


export type TxnHashQuery = { __typename?: 'Query', txn?: { __typename?: 'Txn', id: string } | null };

export type UserIdQueryVariables = Exact<{
  custodyAddress: Scalars['String']['input'];
}>;


export type UserIdQuery = { __typename?: 'Query', users?: { __typename?: 'UserPage', items?: Array<{ __typename?: 'User', id: any, userId: any, to: string, recovery: string, from: string }> | null } | null };


export const AllAddsDocument = gql`
    query allAdds {
  addss(orderBy: "timestamp", orderDirection: "desc") {
    items {
      addedById
      removed
      item {
        id
        timestamp
        createdById
        uri
      }
      channelId
      channel {
        name
        roles(orderBy: "role", orderDirection: "desc") {
          items {
            timestamp
            rid
            role
          }
        }
        adds(orderBy: "timestamp", orderDirection: "desc") {
          items {
            itemId
          }
        }
      }
    }
  }
}
    `;
export const AllChannelsDocument = gql`
    query allChannels {
  channels(orderBy: "timestamp", orderDirection: "desc") {
    items {
      id
      timestamp
      createdById
      uri
      name
      description
      roles(orderBy: "timestamp", orderDirection: "desc") {
        items {
          timestamp
          rid
          role
        }
      }
    }
  }
}
    `;
export const AllChannelsWithRidDocument = gql`
    query allChannelsWithRid($rid: BigInt!) {
  channelRoless(where: {rid: $rid, role_gte: "1"}) {
    items {
      channel {
        id
        timestamp
        createdById
        uri
        name
        description
        roles {
          items {
            rid
            role
          }
        }
        adds(orderBy: "timestamp", orderDirection: "desc") {
          items {
            timestamp
            channelId
            itemId
            addedById
            removed
            item {
              id
              uri
              timestamp
              createdById
            }
          }
        }
      }
    }
  }
}
    `;
export const AllItemsDocument = gql`
    query allItems {
  items(orderDirection: "desc", orderBy: "timestamp") {
    items {
      id
    }
  }
}
    `;
export const AllUsersDocument = gql`
    query allUsers {
  users(orderDirection: "desc") {
    items {
      id
    }
  }
}
    `;
export const ChannelWithIdDocument = gql`
    query channelWithId($id: String!) {
  channel(id: $id) {
    id
    timestamp
    createdById
    uri
    name
    description
    roles(orderBy: "role", orderDirection: "desc") {
      items {
        timestamp
        rid
        role
      }
    }
    adds(orderBy: "timestamp", orderDirection: "desc") {
      items {
        timestamp
        channelId
        itemId
        addedById
        removed
        item {
          id
          uri
          timestamp
          createdById
        }
        channel {
          name
          adds(orderBy: "timestamp", orderDirection: "desc") {
            items {
              itemId
            }
          }
        }
      }
    }
  }
}
    `;
export const ChannelsForItemDocument = gql`
    query channelsForItem($id: String!) {
  addss(where: {itemId: $id}) {
    items {
      channel {
        id
        timestamp
        uri
        name
        roles {
          items {
            rid
            role
          }
        }
        adds(orderBy: "timestamp", orderDirection: "desc") {
          items {
            timestamp
            channelId
            itemId
            addedById
            removed
            item {
              id
              uri
              timestamp
              createdById
            }
          }
        }
      }
    }
  }
}
    `;
export const ChannelsItemsWithUserDocument = gql`
    query channelsItemsWithUser($userId: BigInt!) {
  channels(
    where: {createdById: $userId}
    orderBy: "timestamp"
    orderDirection: "desc"
  ) {
    items {
      id
      name
      description
      createdById
      roles {
        items {
          rid
          role
        }
      }
      adds(orderBy: "timestamp", orderDirection: "desc") {
        items {
          timestamp
          removed
          item {
            uri
          }
        }
      }
    }
  }
  items(
    where: {createdById: $userId}
    orderBy: "timestamp"
    orderDirection: "desc"
    limit: 100
  ) {
    items {
      timestamp
      uri
    }
  }
}
    `;
export const ItemPageDocument = gql`
    query itemPage($id: String!) {
  adds(id: $id) {
    addedById
    timestamp
    itemId
    channel {
      name
    }
    channelId
    item {
      uri
      createdById
    }
  }
}
    `;
export const ItemWithIdDocument = gql`
    query itemWithId($id: String!) {
  item(id: $id) {
    id
    timestamp
    createdById
    uri
  }
}
    `;
export const MarqueeDataDocument = gql`
    query marqueeData {
  userCounters {
    items {
      counter
    }
  }
  itemCounters {
    items {
      counter
    }
  }
  channelCounters {
    items {
      counter
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
    items {
      id
      userId
      to
      recovery
      from
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    allAdds(variables?: AllAddsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllAddsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllAddsQuery>(AllAddsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allAdds', 'query');
    },
    allChannels(variables?: AllChannelsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllChannelsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllChannelsQuery>(AllChannelsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allChannels', 'query');
    },
    allChannelsWithRid(variables: AllChannelsWithRidQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllChannelsWithRidQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllChannelsWithRidQuery>(AllChannelsWithRidDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allChannelsWithRid', 'query');
    },
    allItems(variables?: AllItemsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllItemsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllItemsQuery>(AllItemsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allItems', 'query');
    },
    allUsers(variables?: AllUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllUsersQuery>(AllUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allUsers', 'query');
    },
    channelWithId(variables: ChannelWithIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelWithIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelWithIdQuery>(ChannelWithIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channelWithId', 'query');
    },
    channelsForItem(variables: ChannelsForItemQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelsForItemQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelsForItemQuery>(ChannelsForItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channelsForItem', 'query');
    },
    channelsItemsWithUser(variables: ChannelsItemsWithUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelsItemsWithUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelsItemsWithUserQuery>(ChannelsItemsWithUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channelsItemsWithUser', 'query');
    },
    itemPage(variables: ItemPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ItemPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemPageQuery>(ItemPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'itemPage', 'query');
    },
    itemWithId(variables: ItemWithIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ItemWithIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ItemWithIdQuery>(ItemWithIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'itemWithId', 'query');
    },
    marqueeData(variables?: MarqueeDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MarqueeDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarqueeDataQuery>(MarqueeDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'marqueeData', 'query');
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