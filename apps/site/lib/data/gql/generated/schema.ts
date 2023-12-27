// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
  BigInt: any
  String: string
  Int: number
  Boolean: boolean
}

export interface Query {
  user: User | null
  users: User[]
  txn: Txn | null
  txns: Txn[]
  postCounter: PostCounter | null
  postCounters: PostCounter[]
  post: Post | null
  posts: Post[]
  message: Message | null
  messages: Message[]
  channelCounter: ChannelCounter | null
  channelCounters: ChannelCounter[]
  channel: Channel | null
  channels: Channel[]
  publicationCounter: PublicationCounter | null
  publicationCounters: PublicationCounter[]
  publication: Publication | null
  publications: Publication[]
  referenceCounter: ReferenceCounter | null
  referenceCounters: ReferenceCounter[]
  reference: Reference | null
  references: Reference[]
  __typename: 'Query'
}

export interface User {
  id: Scalars['BigInt']
  userId: Scalars['BigInt']
  to: Scalars['String']
  backup: Scalars['String']
  from: Scalars['String']
  __typename: 'User'
}

export interface Txn {
  id: Scalars['String']
  __typename: 'Txn'
}

export interface PostCounter {
  id: Scalars['String']
  counter: Scalars['BigInt']
  lastUpdated: Scalars['BigInt']
  __typename: 'PostCounter'
}

export interface Post {
  id: Scalars['String']
  timestamp: Scalars['BigInt']
  relayer: Scalars['String']
  data: Scalars['String']
  userId: Scalars['BigInt']
  hashType: Scalars['BigInt']
  hash: Scalars['String']
  sigType: Scalars['BigInt']
  sig: Scalars['String']
  version: Scalars['BigInt']
  expiration: Scalars['BigInt']
  messageArray: Scalars['String'][]
  __typename: 'Post'
}

export interface Message {
  id: Scalars['String']
  msgType: Scalars['BigInt']
  msgBody: Scalars['String']
  __typename: 'Message'
}

export interface ChannelCounter {
  id: Scalars['String']
  counter: Scalars['BigInt']
  lastUpdated: Scalars['BigInt']
  __typename: 'ChannelCounter'
}

export interface Channel {
  id: Scalars['BigInt']
  createdTimestamp: Scalars['BigInt']
  createdBy: Scalars['BigInt']
  uri: Scalars['String']
  admins: Scalars['BigInt'][]
  members: Scalars['BigInt'][]
  references: Reference[]
  __typename: 'Channel'
}

export interface Reference {
  id: Scalars['BigInt']
  createdTimestamp: Scalars['BigInt']
  createdBy: Scalars['BigInt']
  channelId: Scalars['BigInt'] | null
  channel: Channel | null
  pubRefId: Scalars['BigInt'] | null
  pubRef: Publication | null
  chanRefId: Scalars['BigInt'] | null
  chanRef: Channel | null
  __typename: 'Reference'
}

export interface Publication {
  id: Scalars['BigInt']
  createdTimestamp: Scalars['BigInt']
  createdBy: Scalars['BigInt']
  uri: Scalars['String']
  __typename: 'Publication'
}

export interface PublicationCounter {
  id: Scalars['String']
  counter: Scalars['BigInt']
  lastUpdated: Scalars['BigInt']
  __typename: 'PublicationCounter'
}

export interface ReferenceCounter {
  id: Scalars['String']
  counter: Scalars['BigInt']
  lastUpdated: Scalars['BigInt']
  __typename: 'ReferenceCounter'
}

export interface QueryGenqlSelection {
  user?: UserGenqlSelection & {
    __args: { id: Scalars['BigInt']; timestamp?: Scalars['Int'] | null }
  }
  users?: UserGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: UserFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  txn?: TxnGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  txns?: TxnGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: TxnFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  postCounter?: PostCounterGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  postCounters?: PostCounterGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: PostCounterFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  post?: PostGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  posts?: PostGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: PostFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  message?: MessageGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  messages?: MessageGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: MessageFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  channelCounter?: ChannelCounterGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  channelCounters?: ChannelCounterGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: ChannelCounterFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  channel?: ChannelGenqlSelection & {
    __args: { id: Scalars['BigInt']; timestamp?: Scalars['Int'] | null }
  }
  channels?: ChannelGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: ChannelFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  publicationCounter?: PublicationCounterGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  publicationCounters?: PublicationCounterGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: PublicationCounterFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  publication?: PublicationGenqlSelection & {
    __args: { id: Scalars['BigInt']; timestamp?: Scalars['Int'] | null }
  }
  publications?: PublicationGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: PublicationFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  referenceCounter?: ReferenceCounterGenqlSelection & {
    __args: { id: Scalars['String']; timestamp?: Scalars['Int'] | null }
  }
  referenceCounters?: ReferenceCounterGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: ReferenceCounterFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  reference?: ReferenceGenqlSelection & {
    __args: { id: Scalars['BigInt']; timestamp?: Scalars['Int'] | null }
  }
  references?: ReferenceGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      where?: ReferenceFilter | null
      timestamp?: Scalars['Int'] | null
    }
  }
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface UserGenqlSelection {
  id?: boolean | number
  userId?: boolean | number
  to?: boolean | number
  backup?: boolean | number
  from?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface UserFilter {
  id?: Scalars['BigInt'] | null
  id_not?: Scalars['BigInt'] | null
  id_in?: (Scalars['BigInt'] | null)[] | null
  id_not_in?: (Scalars['BigInt'] | null)[] | null
  id_gt?: Scalars['BigInt'] | null
  id_lt?: Scalars['BigInt'] | null
  id_gte?: Scalars['BigInt'] | null
  id_lte?: Scalars['BigInt'] | null
  userId?: Scalars['BigInt'] | null
  userId_not?: Scalars['BigInt'] | null
  userId_in?: (Scalars['BigInt'] | null)[] | null
  userId_not_in?: (Scalars['BigInt'] | null)[] | null
  userId_gt?: Scalars['BigInt'] | null
  userId_lt?: Scalars['BigInt'] | null
  userId_gte?: Scalars['BigInt'] | null
  userId_lte?: Scalars['BigInt'] | null
  to?: Scalars['String'] | null
  to_not?: Scalars['String'] | null
  to_in?: (Scalars['String'] | null)[] | null
  to_not_in?: (Scalars['String'] | null)[] | null
  to_contains?: Scalars['String'] | null
  to_not_contains?: Scalars['String'] | null
  to_starts_with?: Scalars['String'] | null
  to_ends_with?: Scalars['String'] | null
  to_not_starts_with?: Scalars['String'] | null
  to_not_ends_with?: Scalars['String'] | null
  backup?: Scalars['String'] | null
  backup_not?: Scalars['String'] | null
  backup_in?: (Scalars['String'] | null)[] | null
  backup_not_in?: (Scalars['String'] | null)[] | null
  backup_contains?: Scalars['String'] | null
  backup_not_contains?: Scalars['String'] | null
  backup_starts_with?: Scalars['String'] | null
  backup_ends_with?: Scalars['String'] | null
  backup_not_starts_with?: Scalars['String'] | null
  backup_not_ends_with?: Scalars['String'] | null
  from?: Scalars['String'] | null
  from_not?: Scalars['String'] | null
  from_in?: (Scalars['String'] | null)[] | null
  from_not_in?: (Scalars['String'] | null)[] | null
  from_contains?: Scalars['String'] | null
  from_not_contains?: Scalars['String'] | null
  from_starts_with?: Scalars['String'] | null
  from_ends_with?: Scalars['String'] | null
  from_not_starts_with?: Scalars['String'] | null
  from_not_ends_with?: Scalars['String'] | null
}

export interface TxnGenqlSelection {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TxnFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
}

export interface PostCounterGenqlSelection {
  id?: boolean | number
  counter?: boolean | number
  lastUpdated?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PostCounterFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
  counter?: Scalars['BigInt'] | null
  counter_not?: Scalars['BigInt'] | null
  counter_in?: (Scalars['BigInt'] | null)[] | null
  counter_not_in?: (Scalars['BigInt'] | null)[] | null
  counter_gt?: Scalars['BigInt'] | null
  counter_lt?: Scalars['BigInt'] | null
  counter_gte?: Scalars['BigInt'] | null
  counter_lte?: Scalars['BigInt'] | null
  lastUpdated?: Scalars['BigInt'] | null
  lastUpdated_not?: Scalars['BigInt'] | null
  lastUpdated_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_not_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_gt?: Scalars['BigInt'] | null
  lastUpdated_lt?: Scalars['BigInt'] | null
  lastUpdated_gte?: Scalars['BigInt'] | null
  lastUpdated_lte?: Scalars['BigInt'] | null
}

export interface PostGenqlSelection {
  id?: boolean | number
  timestamp?: boolean | number
  relayer?: boolean | number
  data?: boolean | number
  userId?: boolean | number
  hashType?: boolean | number
  hash?: boolean | number
  sigType?: boolean | number
  sig?: boolean | number
  version?: boolean | number
  expiration?: boolean | number
  messageArray?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PostFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
  timestamp?: Scalars['BigInt'] | null
  timestamp_not?: Scalars['BigInt'] | null
  timestamp_in?: (Scalars['BigInt'] | null)[] | null
  timestamp_not_in?: (Scalars['BigInt'] | null)[] | null
  timestamp_gt?: Scalars['BigInt'] | null
  timestamp_lt?: Scalars['BigInt'] | null
  timestamp_gte?: Scalars['BigInt'] | null
  timestamp_lte?: Scalars['BigInt'] | null
  relayer?: Scalars['String'] | null
  relayer_not?: Scalars['String'] | null
  relayer_in?: (Scalars['String'] | null)[] | null
  relayer_not_in?: (Scalars['String'] | null)[] | null
  relayer_contains?: Scalars['String'] | null
  relayer_not_contains?: Scalars['String'] | null
  relayer_starts_with?: Scalars['String'] | null
  relayer_ends_with?: Scalars['String'] | null
  relayer_not_starts_with?: Scalars['String'] | null
  relayer_not_ends_with?: Scalars['String'] | null
  data?: Scalars['String'] | null
  data_not?: Scalars['String'] | null
  data_in?: (Scalars['String'] | null)[] | null
  data_not_in?: (Scalars['String'] | null)[] | null
  data_contains?: Scalars['String'] | null
  data_not_contains?: Scalars['String'] | null
  data_starts_with?: Scalars['String'] | null
  data_ends_with?: Scalars['String'] | null
  data_not_starts_with?: Scalars['String'] | null
  data_not_ends_with?: Scalars['String'] | null
  userId?: Scalars['BigInt'] | null
  userId_not?: Scalars['BigInt'] | null
  userId_in?: (Scalars['BigInt'] | null)[] | null
  userId_not_in?: (Scalars['BigInt'] | null)[] | null
  userId_gt?: Scalars['BigInt'] | null
  userId_lt?: Scalars['BigInt'] | null
  userId_gte?: Scalars['BigInt'] | null
  userId_lte?: Scalars['BigInt'] | null
  hashType?: Scalars['BigInt'] | null
  hashType_not?: Scalars['BigInt'] | null
  hashType_in?: (Scalars['BigInt'] | null)[] | null
  hashType_not_in?: (Scalars['BigInt'] | null)[] | null
  hashType_gt?: Scalars['BigInt'] | null
  hashType_lt?: Scalars['BigInt'] | null
  hashType_gte?: Scalars['BigInt'] | null
  hashType_lte?: Scalars['BigInt'] | null
  hash?: Scalars['String'] | null
  hash_not?: Scalars['String'] | null
  hash_in?: (Scalars['String'] | null)[] | null
  hash_not_in?: (Scalars['String'] | null)[] | null
  hash_contains?: Scalars['String'] | null
  hash_not_contains?: Scalars['String'] | null
  hash_starts_with?: Scalars['String'] | null
  hash_ends_with?: Scalars['String'] | null
  hash_not_starts_with?: Scalars['String'] | null
  hash_not_ends_with?: Scalars['String'] | null
  sigType?: Scalars['BigInt'] | null
  sigType_not?: Scalars['BigInt'] | null
  sigType_in?: (Scalars['BigInt'] | null)[] | null
  sigType_not_in?: (Scalars['BigInt'] | null)[] | null
  sigType_gt?: Scalars['BigInt'] | null
  sigType_lt?: Scalars['BigInt'] | null
  sigType_gte?: Scalars['BigInt'] | null
  sigType_lte?: Scalars['BigInt'] | null
  sig?: Scalars['String'] | null
  sig_not?: Scalars['String'] | null
  sig_in?: (Scalars['String'] | null)[] | null
  sig_not_in?: (Scalars['String'] | null)[] | null
  sig_contains?: Scalars['String'] | null
  sig_not_contains?: Scalars['String'] | null
  sig_starts_with?: Scalars['String'] | null
  sig_ends_with?: Scalars['String'] | null
  sig_not_starts_with?: Scalars['String'] | null
  sig_not_ends_with?: Scalars['String'] | null
  version?: Scalars['BigInt'] | null
  version_not?: Scalars['BigInt'] | null
  version_in?: (Scalars['BigInt'] | null)[] | null
  version_not_in?: (Scalars['BigInt'] | null)[] | null
  version_gt?: Scalars['BigInt'] | null
  version_lt?: Scalars['BigInt'] | null
  version_gte?: Scalars['BigInt'] | null
  version_lte?: Scalars['BigInt'] | null
  expiration?: Scalars['BigInt'] | null
  expiration_not?: Scalars['BigInt'] | null
  expiration_in?: (Scalars['BigInt'] | null)[] | null
  expiration_not_in?: (Scalars['BigInt'] | null)[] | null
  expiration_gt?: Scalars['BigInt'] | null
  expiration_lt?: Scalars['BigInt'] | null
  expiration_gte?: Scalars['BigInt'] | null
  expiration_lte?: Scalars['BigInt'] | null
  messageArray?: (Scalars['String'] | null)[] | null
  messageArray_not?: (Scalars['String'] | null)[] | null
  messageArray_has?: Scalars['String'] | null
  messageArray_not_has?: Scalars['String'] | null
}

export interface MessageGenqlSelection {
  id?: boolean | number
  msgType?: boolean | number
  msgBody?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MessageFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
  msgType?: Scalars['BigInt'] | null
  msgType_not?: Scalars['BigInt'] | null
  msgType_in?: (Scalars['BigInt'] | null)[] | null
  msgType_not_in?: (Scalars['BigInt'] | null)[] | null
  msgType_gt?: Scalars['BigInt'] | null
  msgType_lt?: Scalars['BigInt'] | null
  msgType_gte?: Scalars['BigInt'] | null
  msgType_lte?: Scalars['BigInt'] | null
  msgBody?: Scalars['String'] | null
  msgBody_not?: Scalars['String'] | null
  msgBody_in?: (Scalars['String'] | null)[] | null
  msgBody_not_in?: (Scalars['String'] | null)[] | null
  msgBody_contains?: Scalars['String'] | null
  msgBody_not_contains?: Scalars['String'] | null
  msgBody_starts_with?: Scalars['String'] | null
  msgBody_ends_with?: Scalars['String'] | null
  msgBody_not_starts_with?: Scalars['String'] | null
  msgBody_not_ends_with?: Scalars['String'] | null
}

export interface ChannelCounterGenqlSelection {
  id?: boolean | number
  counter?: boolean | number
  lastUpdated?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ChannelCounterFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
  counter?: Scalars['BigInt'] | null
  counter_not?: Scalars['BigInt'] | null
  counter_in?: (Scalars['BigInt'] | null)[] | null
  counter_not_in?: (Scalars['BigInt'] | null)[] | null
  counter_gt?: Scalars['BigInt'] | null
  counter_lt?: Scalars['BigInt'] | null
  counter_gte?: Scalars['BigInt'] | null
  counter_lte?: Scalars['BigInt'] | null
  lastUpdated?: Scalars['BigInt'] | null
  lastUpdated_not?: Scalars['BigInt'] | null
  lastUpdated_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_not_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_gt?: Scalars['BigInt'] | null
  lastUpdated_lt?: Scalars['BigInt'] | null
  lastUpdated_gte?: Scalars['BigInt'] | null
  lastUpdated_lte?: Scalars['BigInt'] | null
}

export interface ChannelGenqlSelection {
  id?: boolean | number
  createdTimestamp?: boolean | number
  createdBy?: boolean | number
  uri?: boolean | number
  admins?: boolean | number
  members?: boolean | number
  references?: ReferenceGenqlSelection & {
    __args?: {
      skip?: Scalars['Int'] | null
      first?: Scalars['Int'] | null
      orderBy?: Scalars['String'] | null
      orderDirection?: Scalars['String'] | null
      timestamp?: Scalars['Int'] | null
    }
  }
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ReferenceGenqlSelection {
  id?: boolean | number
  createdTimestamp?: boolean | number
  createdBy?: boolean | number
  channelId?: boolean | number
  channel?: ChannelGenqlSelection
  pubRefId?: boolean | number
  pubRef?: PublicationGenqlSelection
  chanRefId?: boolean | number
  chanRef?: ChannelGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PublicationGenqlSelection {
  id?: boolean | number
  createdTimestamp?: boolean | number
  createdBy?: boolean | number
  uri?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ChannelFilter {
  id?: Scalars['BigInt'] | null
  id_not?: Scalars['BigInt'] | null
  id_in?: (Scalars['BigInt'] | null)[] | null
  id_not_in?: (Scalars['BigInt'] | null)[] | null
  id_gt?: Scalars['BigInt'] | null
  id_lt?: Scalars['BigInt'] | null
  id_gte?: Scalars['BigInt'] | null
  id_lte?: Scalars['BigInt'] | null
  createdTimestamp?: Scalars['BigInt'] | null
  createdTimestamp_not?: Scalars['BigInt'] | null
  createdTimestamp_in?: (Scalars['BigInt'] | null)[] | null
  createdTimestamp_not_in?: (Scalars['BigInt'] | null)[] | null
  createdTimestamp_gt?: Scalars['BigInt'] | null
  createdTimestamp_lt?: Scalars['BigInt'] | null
  createdTimestamp_gte?: Scalars['BigInt'] | null
  createdTimestamp_lte?: Scalars['BigInt'] | null
  createdBy?: Scalars['BigInt'] | null
  createdBy_not?: Scalars['BigInt'] | null
  createdBy_in?: (Scalars['BigInt'] | null)[] | null
  createdBy_not_in?: (Scalars['BigInt'] | null)[] | null
  createdBy_gt?: Scalars['BigInt'] | null
  createdBy_lt?: Scalars['BigInt'] | null
  createdBy_gte?: Scalars['BigInt'] | null
  createdBy_lte?: Scalars['BigInt'] | null
  uri?: Scalars['String'] | null
  uri_not?: Scalars['String'] | null
  uri_in?: (Scalars['String'] | null)[] | null
  uri_not_in?: (Scalars['String'] | null)[] | null
  uri_contains?: Scalars['String'] | null
  uri_not_contains?: Scalars['String'] | null
  uri_starts_with?: Scalars['String'] | null
  uri_ends_with?: Scalars['String'] | null
  uri_not_starts_with?: Scalars['String'] | null
  uri_not_ends_with?: Scalars['String'] | null
  admins?: (Scalars['BigInt'] | null)[] | null
  admins_not?: (Scalars['BigInt'] | null)[] | null
  admins_has?: Scalars['BigInt'] | null
  admins_not_has?: Scalars['BigInt'] | null
  members?: (Scalars['BigInt'] | null)[] | null
  members_not?: (Scalars['BigInt'] | null)[] | null
  members_has?: Scalars['BigInt'] | null
  members_not_has?: Scalars['BigInt'] | null
}

export interface PublicationCounterGenqlSelection {
  id?: boolean | number
  counter?: boolean | number
  lastUpdated?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PublicationCounterFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
  counter?: Scalars['BigInt'] | null
  counter_not?: Scalars['BigInt'] | null
  counter_in?: (Scalars['BigInt'] | null)[] | null
  counter_not_in?: (Scalars['BigInt'] | null)[] | null
  counter_gt?: Scalars['BigInt'] | null
  counter_lt?: Scalars['BigInt'] | null
  counter_gte?: Scalars['BigInt'] | null
  counter_lte?: Scalars['BigInt'] | null
  lastUpdated?: Scalars['BigInt'] | null
  lastUpdated_not?: Scalars['BigInt'] | null
  lastUpdated_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_not_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_gt?: Scalars['BigInt'] | null
  lastUpdated_lt?: Scalars['BigInt'] | null
  lastUpdated_gte?: Scalars['BigInt'] | null
  lastUpdated_lte?: Scalars['BigInt'] | null
}

export interface PublicationFilter {
  id?: Scalars['BigInt'] | null
  id_not?: Scalars['BigInt'] | null
  id_in?: (Scalars['BigInt'] | null)[] | null
  id_not_in?: (Scalars['BigInt'] | null)[] | null
  id_gt?: Scalars['BigInt'] | null
  id_lt?: Scalars['BigInt'] | null
  id_gte?: Scalars['BigInt'] | null
  id_lte?: Scalars['BigInt'] | null
  createdTimestamp?: Scalars['BigInt'] | null
  createdTimestamp_not?: Scalars['BigInt'] | null
  createdTimestamp_in?: (Scalars['BigInt'] | null)[] | null
  createdTimestamp_not_in?: (Scalars['BigInt'] | null)[] | null
  createdTimestamp_gt?: Scalars['BigInt'] | null
  createdTimestamp_lt?: Scalars['BigInt'] | null
  createdTimestamp_gte?: Scalars['BigInt'] | null
  createdTimestamp_lte?: Scalars['BigInt'] | null
  createdBy?: Scalars['BigInt'] | null
  createdBy_not?: Scalars['BigInt'] | null
  createdBy_in?: (Scalars['BigInt'] | null)[] | null
  createdBy_not_in?: (Scalars['BigInt'] | null)[] | null
  createdBy_gt?: Scalars['BigInt'] | null
  createdBy_lt?: Scalars['BigInt'] | null
  createdBy_gte?: Scalars['BigInt'] | null
  createdBy_lte?: Scalars['BigInt'] | null
  uri?: Scalars['String'] | null
  uri_not?: Scalars['String'] | null
  uri_in?: (Scalars['String'] | null)[] | null
  uri_not_in?: (Scalars['String'] | null)[] | null
  uri_contains?: Scalars['String'] | null
  uri_not_contains?: Scalars['String'] | null
  uri_starts_with?: Scalars['String'] | null
  uri_ends_with?: Scalars['String'] | null
  uri_not_starts_with?: Scalars['String'] | null
  uri_not_ends_with?: Scalars['String'] | null
}

export interface ReferenceCounterGenqlSelection {
  id?: boolean | number
  counter?: boolean | number
  lastUpdated?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ReferenceCounterFilter {
  id?: Scalars['String'] | null
  id_not?: Scalars['String'] | null
  id_in?: (Scalars['String'] | null)[] | null
  id_not_in?: (Scalars['String'] | null)[] | null
  id_contains?: Scalars['String'] | null
  id_not_contains?: Scalars['String'] | null
  id_starts_with?: Scalars['String'] | null
  id_ends_with?: Scalars['String'] | null
  id_not_starts_with?: Scalars['String'] | null
  id_not_ends_with?: Scalars['String'] | null
  counter?: Scalars['BigInt'] | null
  counter_not?: Scalars['BigInt'] | null
  counter_in?: (Scalars['BigInt'] | null)[] | null
  counter_not_in?: (Scalars['BigInt'] | null)[] | null
  counter_gt?: Scalars['BigInt'] | null
  counter_lt?: Scalars['BigInt'] | null
  counter_gte?: Scalars['BigInt'] | null
  counter_lte?: Scalars['BigInt'] | null
  lastUpdated?: Scalars['BigInt'] | null
  lastUpdated_not?: Scalars['BigInt'] | null
  lastUpdated_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_not_in?: (Scalars['BigInt'] | null)[] | null
  lastUpdated_gt?: Scalars['BigInt'] | null
  lastUpdated_lt?: Scalars['BigInt'] | null
  lastUpdated_gte?: Scalars['BigInt'] | null
  lastUpdated_lte?: Scalars['BigInt'] | null
}

export interface ReferenceFilter {
  id?: Scalars['BigInt'] | null
  id_not?: Scalars['BigInt'] | null
  id_in?: (Scalars['BigInt'] | null)[] | null
  id_not_in?: (Scalars['BigInt'] | null)[] | null
  id_gt?: Scalars['BigInt'] | null
  id_lt?: Scalars['BigInt'] | null
  id_gte?: Scalars['BigInt'] | null
  id_lte?: Scalars['BigInt'] | null
  createdTimestamp?: Scalars['BigInt'] | null
  createdTimestamp_not?: Scalars['BigInt'] | null
  createdTimestamp_in?: (Scalars['BigInt'] | null)[] | null
  createdTimestamp_not_in?: (Scalars['BigInt'] | null)[] | null
  createdTimestamp_gt?: Scalars['BigInt'] | null
  createdTimestamp_lt?: Scalars['BigInt'] | null
  createdTimestamp_gte?: Scalars['BigInt'] | null
  createdTimestamp_lte?: Scalars['BigInt'] | null
  createdBy?: Scalars['BigInt'] | null
  createdBy_not?: Scalars['BigInt'] | null
  createdBy_in?: (Scalars['BigInt'] | null)[] | null
  createdBy_not_in?: (Scalars['BigInt'] | null)[] | null
  createdBy_gt?: Scalars['BigInt'] | null
  createdBy_lt?: Scalars['BigInt'] | null
  createdBy_gte?: Scalars['BigInt'] | null
  createdBy_lte?: Scalars['BigInt'] | null
  channelId?: Scalars['BigInt'] | null
  channelId_not?: Scalars['BigInt'] | null
  channelId_in?: (Scalars['BigInt'] | null)[] | null
  channelId_not_in?: (Scalars['BigInt'] | null)[] | null
  channelId_gt?: Scalars['BigInt'] | null
  channelId_lt?: Scalars['BigInt'] | null
  channelId_gte?: Scalars['BigInt'] | null
  channelId_lte?: Scalars['BigInt'] | null
  pubRefId?: Scalars['BigInt'] | null
  pubRefId_not?: Scalars['BigInt'] | null
  pubRefId_in?: (Scalars['BigInt'] | null)[] | null
  pubRefId_not_in?: (Scalars['BigInt'] | null)[] | null
  pubRefId_gt?: Scalars['BigInt'] | null
  pubRefId_lt?: Scalars['BigInt'] | null
  pubRefId_gte?: Scalars['BigInt'] | null
  pubRefId_lte?: Scalars['BigInt'] | null
  chanRefId?: Scalars['BigInt'] | null
  chanRefId_not?: Scalars['BigInt'] | null
  chanRefId_in?: (Scalars['BigInt'] | null)[] | null
  chanRefId_not_in?: (Scalars['BigInt'] | null)[] | null
  chanRefId_gt?: Scalars['BigInt'] | null
  chanRefId_lt?: Scalars['BigInt'] | null
  chanRefId_gte?: Scalars['BigInt'] | null
  chanRefId_lte?: Scalars['BigInt'] | null
}

const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}

const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}

const Txn_possibleTypes: string[] = ['Txn']
export const isTxn = (obj?: { __typename?: any } | null): obj is Txn => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTxn"')
  return Txn_possibleTypes.includes(obj.__typename)
}

const PostCounter_possibleTypes: string[] = ['PostCounter']
export const isPostCounter = (
  obj?: { __typename?: any } | null,
): obj is PostCounter => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isPostCounter"')
  return PostCounter_possibleTypes.includes(obj.__typename)
}

const Post_possibleTypes: string[] = ['Post']
export const isPost = (obj?: { __typename?: any } | null): obj is Post => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPost"')
  return Post_possibleTypes.includes(obj.__typename)
}

const Message_possibleTypes: string[] = ['Message']
export const isMessage = (
  obj?: { __typename?: any } | null,
): obj is Message => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMessage"')
  return Message_possibleTypes.includes(obj.__typename)
}

const ChannelCounter_possibleTypes: string[] = ['ChannelCounter']
export const isChannelCounter = (
  obj?: { __typename?: any } | null,
): obj is ChannelCounter => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isChannelCounter"')
  return ChannelCounter_possibleTypes.includes(obj.__typename)
}

const Channel_possibleTypes: string[] = ['Channel']
export const isChannel = (
  obj?: { __typename?: any } | null,
): obj is Channel => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isChannel"')
  return Channel_possibleTypes.includes(obj.__typename)
}

const Reference_possibleTypes: string[] = ['Reference']
export const isReference = (
  obj?: { __typename?: any } | null,
): obj is Reference => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isReference"')
  return Reference_possibleTypes.includes(obj.__typename)
}

const Publication_possibleTypes: string[] = ['Publication']
export const isPublication = (
  obj?: { __typename?: any } | null,
): obj is Publication => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isPublication"')
  return Publication_possibleTypes.includes(obj.__typename)
}

const PublicationCounter_possibleTypes: string[] = ['PublicationCounter']
export const isPublicationCounter = (
  obj?: { __typename?: any } | null,
): obj is PublicationCounter => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isPublicationCounter"')
  return PublicationCounter_possibleTypes.includes(obj.__typename)
}

const ReferenceCounter_possibleTypes: string[] = ['ReferenceCounter']
export const isReferenceCounter = (
  obj?: { __typename?: any } | null,
): obj is ReferenceCounter => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isReferenceCounter"')
  return ReferenceCounter_possibleTypes.includes(obj.__typename)
}
