import { getListings } from '../gql/requests/getListings';

const { channels } = await getListings({
    channel: '0x5A2AfcD3aA9B1445A49f0bc8f9c11bFe3DA391de',
  });