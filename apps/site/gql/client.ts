import { GraphQLClient } from 'graphql-request'
import { getSdk } from './sdk.generated'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_API as string,
  {
    headers: {
      'Content-Type': 'application/json',
    },
	fetch,
  },
)

const sdk = getSdk(client)

export default sdk
