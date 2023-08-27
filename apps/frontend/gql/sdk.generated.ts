import { DocumentNode } from 'graphql';
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
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String']['output'];
  listings: Array<Listing>;
};


export type ChannelListingsArgs = {
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
};

export type Listing = {
  __typename?: 'Listing';
  chainId: Scalars['String']['output'];
  channel?: Maybe<Channel>;
  hasTokenId: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  listingAddress: Scalars['String']['output'];
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

/** Autogenerated file. Do not edit manually. */
export type Query = {
  __typename?: 'Query';
  channel?: Maybe<Channel>;
  channels: Array<Channel>;
  listing?: Maybe<Listing>;
  listings: Array<Listing>;
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

export type ListingsQueryVariables = Exact<{
  channel: Scalars['String']['input'];
}>;


export type ListingsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', listings: Array<{ __typename?: 'Listing', chainId: string, tokenId: string, listingAddress: string, hasTokenId: boolean }> }> };


export const ListingsDocument: DocumentNode = gql`
    query listings($channel: String!) {
  channels(where: {id: $channel}) {
    listings {
      chainId
      tokenId
      listingAddress
      hasTokenId
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    listings(variables: ListingsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ListingsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ListingsQuery>(ListingsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'listings', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;