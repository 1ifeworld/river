import { GraphQLClient } from 'graphql-request'
import { getSdk } from './sdk.generated'
import { env } from '../services/env'

const client = new GraphQLClient(env.NEXT_PUBLIC_GRAPHQL_API, {
  headers: {
    'Content-Type': 'application/json',
  },
})

const sdk = getSdk(client)

export default sdk
