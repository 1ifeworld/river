import { GraphQLClient } from 'graphql-request';
import { getSdk } from './sdk.generated';

const client = new GraphQLClient('http://localhost:42069/graphql', {
  headers: {
    'Content-Type': 'application/json',
  },
});

const sdk = getSdk(client);

export default sdk;