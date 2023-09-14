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
  contractUri?: Maybe<ContractUri>;
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  createdBy: Scalars['String']['output'];
  id: Scalars['String']['output'];
  listings: Array<Listing>;
  logicTransmitterMerkleAdmin: Array<LogicTransmitterMerkleAdmin>;
};


export type ChannelListingsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


export type ChannelLogicTransmitterMerkleAdminArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};

export type ChannelFilter = {
  contractUri?: InputMaybe<Scalars['String']['input']>;
  contractUri_contains?: InputMaybe<Scalars['String']['input']>;
  contractUri_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractUri_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractUri_not?: InputMaybe<Scalars['String']['input']>;
  contractUri_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractUri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractUri_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contractUri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractUri_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  createdBy_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']['input']>;
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

export type ContractUri = {
  __typename?: 'ContractUri';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type ContractUriFilter = {
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
  image?: InputMaybe<Scalars['String']['input']>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_not?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
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

export type Listing = {
  __typename?: 'Listing';
  chainId: Scalars['String']['output'];
  channel?: Maybe<Channel>;
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  createdBy: Scalars['String']['output'];
  hasTokenId: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  listingAddress: Scalars['String']['output'];
  listingTargetMetadata?: Maybe<PieceMetadata>;
  tokenId: Scalars['String']['output'];
};

export type ListingFilter = {
  chainId?: InputMaybe<Scalars['String']['input']>;
  chainId_contains?: InputMaybe<Scalars['String']['input']>;
  chainId_ends_with?: InputMaybe<Scalars['String']['input']>;
  chainId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chainId_not?: InputMaybe<Scalars['String']['input']>;
  chainId_not_contains?: InputMaybe<Scalars['String']['input']>;
  chainId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  chainId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chainId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  chainId_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  createdBy_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']['input']>;
  hasTokenId?: InputMaybe<Scalars['Boolean']['input']>;
  hasTokenId_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  hasTokenId_not?: InputMaybe<Scalars['Boolean']['input']>;
  hasTokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
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
  listingAddress?: InputMaybe<Scalars['String']['input']>;
  listingAddress_contains?: InputMaybe<Scalars['String']['input']>;
  listingAddress_ends_with?: InputMaybe<Scalars['String']['input']>;
  listingAddress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  listingAddress_not?: InputMaybe<Scalars['String']['input']>;
  listingAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  listingAddress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  listingAddress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  listingAddress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  listingAddress_starts_with?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_contains?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_ends_with?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  listingTargetMetadata_not?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_not_contains?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  listingTargetMetadata_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  listingTargetMetadata_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId?: InputMaybe<Scalars['String']['input']>;
  tokenId_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_not?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tokenId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  tokenId_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LogicTransmitterMerkleAdmin = {
  __typename?: 'LogicTransmitterMerkleAdmin';
  accounts?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['String']['output'];
  merkleRoot?: Maybe<Scalars['String']['output']>;
  press?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<Scalars['Boolean']['output']>>>;
};

export type LogicTransmitterMerkleAdminFilter = {
  accounts?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  accounts_has?: InputMaybe<Scalars['String']['input']>;
  accounts_not?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  accounts_not_has?: InputMaybe<Scalars['String']['input']>;
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
  merkleRoot?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_contains?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_ends_with?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  merkleRoot_not?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_not_contains?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  merkleRoot_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  merkleRoot_starts_with?: InputMaybe<Scalars['String']['input']>;
  press?: InputMaybe<Scalars['String']['input']>;
  press_contains?: InputMaybe<Scalars['String']['input']>;
  press_ends_with?: InputMaybe<Scalars['String']['input']>;
  press_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  press_not?: InputMaybe<Scalars['String']['input']>;
  press_not_contains?: InputMaybe<Scalars['String']['input']>;
  press_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  press_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  press_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  press_starts_with?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  roles_has?: InputMaybe<Scalars['Boolean']['input']>;
  roles_not?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  roles_not_has?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PieceMetadata = {
  __typename?: 'PieceMetadata';
  id: Scalars['String']['output'];
  pieceAnimationURL?: Maybe<Scalars['String']['output']>;
  pieceContentType?: Maybe<Scalars['String']['output']>;
  pieceCreatedDate?: Maybe<Scalars['String']['output']>;
  pieceCreator?: Maybe<Scalars['String']['output']>;
  pieceDescription?: Maybe<Scalars['String']['output']>;
  pieceFullRes?: Maybe<Scalars['String']['output']>;
  pieceName?: Maybe<Scalars['String']['output']>;
  pieceThumbnail?: Maybe<Scalars['String']['output']>;
};

export type PieceMetadataFilter = {
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
  pieceAnimationURL?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_contains?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceAnimationURL_not?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceAnimationURL_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceAnimationURL_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceContentType?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_contains?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceContentType_not?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceContentType_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceContentType_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_contains?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceCreatedDate_not?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceCreatedDate_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreatedDate_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreator?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_contains?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceCreator_not?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceCreator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceCreator_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceDescription?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_contains?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceDescription_not?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceDescription_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceDescription_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_contains?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceFullRes_not?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceFullRes_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceFullRes_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceName?: InputMaybe<Scalars['String']['input']>;
  pieceName_contains?: InputMaybe<Scalars['String']['input']>;
  pieceName_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceName_not?: InputMaybe<Scalars['String']['input']>;
  pieceName_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceName_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_contains?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceThumbnail_not?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_not_contains?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pieceThumbnail_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pieceThumbnail_starts_with?: InputMaybe<Scalars['String']['input']>;
};

/** Autogenerated file. Do not edit manually. */
export type Query = {
  __typename?: 'Query';
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  contractUri?: Maybe<ContractUri>;
  contractUris: Array<ContractUri>;
  listing?: Maybe<Listing>;
  listings: Array<Listing>;
  logicTransmitterMerkleAdmin?: Maybe<LogicTransmitterMerkleAdmin>;
  logicTransmitterMerkleAdmins: Array<LogicTransmitterMerkleAdmin>;
  pieceMetadata?: Maybe<PieceMetadata>;
  pieceMetadatas: Array<PieceMetadata>;
  router?: Maybe<Router>;
  routers: Array<Router>;
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
export type QueryContractUriArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryContractUrisArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContractUriFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryListingArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryListingsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ListingFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryLogicTransmitterMerkleAdminArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryLogicTransmitterMerkleAdminsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LogicTransmitterMerkleAdminFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryPieceMetadataArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryPieceMetadatasArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PieceMetadataFilter>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryRouterArgs = {
  id: Scalars['String']['input'];
  timestamp?: InputMaybe<Scalars['Int']['input']>;
};


/** Autogenerated file. Do not edit manually. */
export type QueryRoutersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RouterFilter>;
};

export type Router = {
  __typename?: 'Router';
  createdAt?: Maybe<Scalars['BigInt']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  factory?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  newPress?: Maybe<Scalars['String']['output']>;
  newPressData?: Maybe<Scalars['String']['output']>;
  pointer?: Maybe<Scalars['String']['output']>;
  press?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type RouterFilter = {
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  createdBy_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_contains?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  createdBy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  createdBy_starts_with?: InputMaybe<Scalars['String']['input']>;
  factory?: InputMaybe<Scalars['String']['input']>;
  factory_contains?: InputMaybe<Scalars['String']['input']>;
  factory_ends_with?: InputMaybe<Scalars['String']['input']>;
  factory_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  factory_not?: InputMaybe<Scalars['String']['input']>;
  factory_not_contains?: InputMaybe<Scalars['String']['input']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  factory_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  factory_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  factory_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  newPress?: InputMaybe<Scalars['String']['input']>;
  newPressData?: InputMaybe<Scalars['String']['input']>;
  newPressData_contains?: InputMaybe<Scalars['String']['input']>;
  newPressData_ends_with?: InputMaybe<Scalars['String']['input']>;
  newPressData_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  newPressData_not?: InputMaybe<Scalars['String']['input']>;
  newPressData_not_contains?: InputMaybe<Scalars['String']['input']>;
  newPressData_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newPressData_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  newPressData_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newPressData_starts_with?: InputMaybe<Scalars['String']['input']>;
  newPress_contains?: InputMaybe<Scalars['String']['input']>;
  newPress_ends_with?: InputMaybe<Scalars['String']['input']>;
  newPress_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  newPress_not?: InputMaybe<Scalars['String']['input']>;
  newPress_not_contains?: InputMaybe<Scalars['String']['input']>;
  newPress_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  newPress_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  newPress_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  newPress_starts_with?: InputMaybe<Scalars['String']['input']>;
  pointer?: InputMaybe<Scalars['String']['input']>;
  pointer_contains?: InputMaybe<Scalars['String']['input']>;
  pointer_ends_with?: InputMaybe<Scalars['String']['input']>;
  pointer_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pointer_not?: InputMaybe<Scalars['String']['input']>;
  pointer_not_contains?: InputMaybe<Scalars['String']['input']>;
  pointer_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pointer_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pointer_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pointer_starts_with?: InputMaybe<Scalars['String']['input']>;
  press?: InputMaybe<Scalars['String']['input']>;
  press_contains?: InputMaybe<Scalars['String']['input']>;
  press_ends_with?: InputMaybe<Scalars['String']['input']>;
  press_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  press_not?: InputMaybe<Scalars['String']['input']>;
  press_not_contains?: InputMaybe<Scalars['String']['input']>;
  press_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  press_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  press_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  press_starts_with?: InputMaybe<Scalars['String']['input']>;
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
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type AllChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, createdAt?: any | null, createdBy: string, contractUri?: { __typename?: 'ContractUri', id: string, uri?: string | null, name?: string | null, description?: string | null, image?: string | null, updatedAt?: any | null } | null, listings: Array<{ __typename?: 'Listing', id: string, createdAt?: any | null, createdBy: string, chainId: string, tokenId: string, listingAddress: string, hasTokenId: boolean, listingTargetMetadata?: { __typename?: 'PieceMetadata', id: string, pieceName?: string | null, pieceCreator?: string | null, pieceDescription?: string | null, pieceThumbnail?: string | null, pieceFullRes?: string | null, pieceAnimationURL?: string | null, pieceCreatedDate?: string | null, pieceContentType?: string | null } | null }>, logicTransmitterMerkleAdmin: Array<{ __typename?: 'LogicTransmitterMerkleAdmin', id: string, press?: string | null, merkleRoot?: string | null, accounts?: Array<string | null> | null, roles?: Array<boolean | null> | null }> }> };

export type ChannelQueryVariables = Exact<{
  channel: Scalars['String']['input'];
}>;


export type ChannelQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, createdAt?: any | null, createdBy: string, contractUri?: { __typename?: 'ContractUri', id: string, uri?: string | null, name?: string | null, description?: string | null, image?: string | null, updatedAt?: any | null } | null, listings: Array<{ __typename?: 'Listing', id: string, createdAt?: any | null, createdBy: string, chainId: string, tokenId: string, listingAddress: string, hasTokenId: boolean, listingTargetMetadata?: { __typename?: 'PieceMetadata', id: string, pieceName?: string | null, pieceCreator?: string | null, pieceDescription?: string | null, pieceThumbnail?: string | null, pieceFullRes?: string | null, pieceAnimationURL?: string | null, pieceCreatedDate?: string | null, pieceContentType?: string | null } | null }>, logicTransmitterMerkleAdmin: Array<{ __typename?: 'LogicTransmitterMerkleAdmin', id: string, press?: string | null, merkleRoot?: string | null, accounts?: Array<string | null> | null, roles?: Array<boolean | null> | null }> }> };

export type ListingQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ListingQuery = { __typename?: 'Query', listings: Array<{ __typename?: 'Listing', id: string, chainId: string, tokenId: string, listingAddress: string, hasTokenId: boolean, createdAt?: any | null, createdBy: string, listingTargetMetadata?: { __typename?: 'PieceMetadata', id: string, pieceName?: string | null, pieceCreator?: string | null, pieceDescription?: string | null, pieceThumbnail?: string | null, pieceFullRes?: string | null, pieceAnimationURL?: string | null, pieceCreatedDate?: string | null, pieceContentType?: string | null } | null }> };

export type ListingsQueryVariables = Exact<{
  channel: Scalars['String']['input'];
}>;


export type ListingsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', listings: Array<{ __typename?: 'Listing', id: string, chainId: string, tokenId: string, listingAddress: string, hasTokenId: boolean, listingTargetMetadata?: { __typename?: 'PieceMetadata', id: string, pieceName?: string | null, pieceCreator?: string | null, pieceDescription?: string | null, pieceThumbnail?: string | null, pieceFullRes?: string | null, pieceAnimationURL?: string | null, pieceCreatedDate?: string | null, pieceContentType?: string | null } | null }> }> };


export const AllChannelsDocument = gql`
    query allChannels {
  channels(
    orderBy: "createdAt"
    orderDirection: "desc"
    where: {createdBy_not_in: ["0x004991c3bbcF3dd0596292C80351798965070D75", "0x806164c929Ad3A6f4bd70c2370b3Ef36c64dEaa8"]}
  ) {
    id
    createdAt
    createdBy
    contractUri {
      id
      uri
      name
      description
      image
      updatedAt
    }
    listings(orderBy: "createdAt", orderDirection: "desc") {
      id
      createdAt
      createdBy
      chainId
      tokenId
      listingAddress
      hasTokenId
      listingTargetMetadata {
        id
        pieceName
        pieceCreator
        pieceDescription
        pieceThumbnail
        pieceFullRes
        pieceAnimationURL
        pieceCreatedDate
        pieceContentType
      }
    }
    logicTransmitterMerkleAdmin {
      id
      press
      merkleRoot
      accounts
      roles
    }
  }
}
    `;
export const ChannelDocument = gql`
    query channel($channel: String!) {
  channels(where: {id: $channel}) {
    id
    createdAt
    createdBy
    contractUri {
      id
      uri
      name
      description
      image
      updatedAt
    }
    listings(orderBy: "createdAt", orderDirection: "desc") {
      id
      createdAt
      createdBy
      chainId
      tokenId
      listingAddress
      hasTokenId
      listingTargetMetadata {
        id
        pieceName
        pieceCreator
        pieceDescription
        pieceThumbnail
        pieceFullRes
        pieceAnimationURL
        pieceCreatedDate
        pieceContentType
      }
    }
    logicTransmitterMerkleAdmin {
      id
      press
      merkleRoot
      accounts
      roles
    }
  }
}
    `;
export const ListingDocument = gql`
    query listing($id: String!) {
  listings(where: {id: $id}) {
    id
    chainId
    tokenId
    listingAddress
    hasTokenId
    createdAt
    createdBy
    listingTargetMetadata {
      id
      pieceName
      pieceCreator
      pieceDescription
      pieceThumbnail
      pieceFullRes
      pieceAnimationURL
      pieceCreatedDate
      pieceContentType
    }
  }
}
    `;
export const ListingsDocument = gql`
    query listings($channel: String!) {
  channels(where: {id: $channel}) {
    listings {
      id
      chainId
      tokenId
      listingAddress
      hasTokenId
      listingTargetMetadata {
        id
        pieceName
        pieceCreator
        pieceDescription
        pieceThumbnail
        pieceFullRes
        pieceAnimationURL
        pieceCreatedDate
        pieceContentType
      }
    }
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
    channel(variables: ChannelQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelQuery>(ChannelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channel', 'query');
    },
    listing(variables: ListingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ListingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListingQuery>(ListingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'listing', 'query');
    },
    listings(variables: ListingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ListingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListingsQuery>(ListingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'listings', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;