import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_API as string,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
)

// const sdk = getSdk(client)

// export default sdk
